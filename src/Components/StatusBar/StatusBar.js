import React, { Component } from 'react';
import './StatusBar.css';
import { Avatar } from '@material-ui/core';
import uploadimage from '../../images/statusadd.png';
import { storage } from '../firebase';

class StatusBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            statusList: [] // Initialize as an empty array
        };
    }

    componentDidMount() {
        this.getData();
    }

    getData = () => {
        fetch('http://localhost:8080/statuses')
            .then(response => response.json())
            .then(data => {
                this.setState({ statusList: data });
            });
    };

    uploadStatus = (event) => {
        let image = event.target.files[0];
        const thisContext = this;
        if (image === null || image === undefined) {
            return;
        }

        var uploadTask = storage.ref('Status').child(image.name).put(image);
        uploadTask.on(
            'state_changed',
            function (snapshot) {},
            function (error) {},
            function () {
                uploadTask.snapshot.ref.getDownloadURL().then(function (downloadURL) {
                    console.log(downloadURL);

                    let payload = {
                        statusId: Math.floor(Math.random() * 100000).toString(),
                        userId: JSON.parse(localStorage.getItem('users')).uid,
                        path: downloadURL,
                        timeStamp: new Date().getTime()
                    };

                    const requestOptions = {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(payload)
                    };

                    fetch('http://localhost:8080/statuses', requestOptions)
                        .then(response => response.json())
                        .then(data => {
                            thisContext.getData();
                        })
                        .catch(error => {});
                });
            }
        );
    };

    render() {
        console.log('statusList:', this.state.statusList);
        const { statuses } = this.state.statusList?._embedded || {};

        return (
            <div>
                <div className="statusbar__container">
                    <div className="fileupload">
                        <label htmlFor="file-upload-status">
                            <img className="statusbar__upload" src={uploadimage} alt="" width="55px" height="55px" />
                        </label><input id="file-upload-status" onChange={this.uploadStatus} type="file" />
                    </div>
                    {Array.isArray(statuses) && statuses.length > 0 ? (
                        statuses.map((status, index) => (
                            <div className="status" key={index}>
                                <Avatar className="statusbar__status" src={status.path} alt={status.userName} />
                                <div className="statusbar__text">{status.userName}</div>
                            </div>
                        ))
                    ) : (
                        <p>No statuses available.</p>
                    )}
                </div>
            </div>
        );
    }
}
export default StatusBar;
