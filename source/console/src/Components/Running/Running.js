// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0

import React from 'react';
import { Row, Col } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExternalLinkAlt } from '@fortawesome/free-solid-svg-icons';
declare var awsConfig;

// uncomment for local debugging
// let awsConfig = {
//     // ...
//     cw_dashboard: 'https://console.aws.amazon.com/cloudwatch/home?region=us-east-1#dashboards:name=EcsLoadTesting-taBBErFMeQ94',
//     ecs_dashboard: 'https://us-east-1.console.aws.amazon.com/ecs/home?region=us-east-1#/clusters/DLT/tasks',
//     aws_project_region: 'us-east-1',
//     // aws_cognito_region: 'us-east-1',
//     // aws_cognito_identity_pool_id: 'us-east-1:7a95e632-8a17-4995-a58b-5dd0d7a40408',
//     // aws_user_pools_id: 'us-east-1_Oxfg70TB1',
//     // aws_user_pools_web_client_id: '4aik5f9fc2ihsme1s45oumsofe',
//     oauth: {},
//     aws_cloud_logic_custom: [
//       {
//         name: 'dlts',
//         endpoint: 'https://ccbq80179d.execute-api.us-east-1.amazonaws.com/prod',
//         region: 'us-east-1'
//       }
//     ],
//     aws_user_files_s3_bucket: 'dlt-scenariosbucket-j3ppagp24or3',
//     aws_user_files_s3_bucket_region: 'us-east-1',
//     // ...
//   };

class Running extends React.Component {

    render() {
        let provisioning = 0;
        let pending = 0;
        let running = 0;

        for (let task in this.props.data.tasks) {
               // eslint-disable-next-line default-case
            switch (this.props.data.tasks[task].lastStatus) {
                case 'PROVISIONING':
                    ++provisioning
                    break;
                case 'PENDING':
                    ++pending
                    break;
                case 'RUNNING':
                    ++running
                    break;
            }
        }

        return (
            <div>
                <div className="box">
                    <h3>Tasks Status:</h3>
                    <span className="console">
                        Details for the running tasks can be viewed in the <a className="text-link"
                        href={awsConfig.ecs_dashboard}
                        target="_blank"
                        rel="noopener noreferrer">
                            Amazon ECS Console <FontAwesomeIcon size="sm" icon={faExternalLinkAlt}/>
                        </a>
                    </span>

                    <Row>
                        <Col sm="3">
                            <div className="result">
                                <b>Task Count:</b><span>{this.props.data.tasks.length} of {this.props.data.taskCount}</span>
                            </div>
                        </Col>
                        <Col sm="3">
                            <div className="result">
                                <b>Provisioning Count:</b><span>{provisioning}</span>
                            </div>
                        </Col>
                        <Col sm="3">
                            <div className="result">
                                <b>Pending Count:</b><span>{pending}</span>
                            </div>
                        </Col>
                        <Col sm="3">
                            <div className="result">
                                <b>Running Count:</b><span>{running}</span>
                            </div>
                        </Col>
                    </Row>
                </div>
                <div className="box">
                <h3>Realtime Avg Response Times</h3>
                    <p className="console">
                    The realtime Average response times can be monitored using the <a className="text-link"
                        href={ awsConfig.cw_dashboard}
                        target="_blank"
                        rel="noopener noreferrer">
                        Amazon CloudWatch Metrics Dashboard <FontAwesomeIcon size="sm" icon={faExternalLinkAlt}/>
                        </a>
                    </p>
                    <p className="note"> Response times will start to populate once the tasks are running, task are launched in batches of 10
                        and it can take 1-2 minutes for all tasks to be running.</p>
                </div>
            </div>
        )
    }

}

export default Running;
