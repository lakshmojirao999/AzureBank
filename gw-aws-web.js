{
    "AWSTemplateFormatVersion": "2010-09-09",
    "Description": "GuideWire IIS Web Server with Windows 2012",
    "Parameters": {
        "pWebServerKeyName": {
            "Description": "Name of an existing EC2 KeyPair to enable SSH access to the instances",
            "Type": "String"
        },
        "pRDPLocation": {
            "Description": "Lockdown RDP access to the bastion host (default can be accessed from anywhere)",
            "Type": "String"
        },
        "pWebServerInstanceType": {
            "Description": "WebServer Server EC2 instance type",
            "Type": "String"
        },
        "pVPCID": {
            "Type": "String",
            "Description": "VPC ID "
        },
        "pwebPrivateSubnetIDAZ1": {
            "Type": "String",
            "Description": "The web serverPrivate SubNet ID for AZ1"
        },
        "pwebPrivateSubnetAZ1": {
            "Type": "String",
            "Description": "The web server Private SubNet Availability Zone1"
        },
        "pwebPrivateSubnetIDAZ2": {
            "Type": "String",
            "Description": "The web serverPrivate SubNet ID for AZ1"
        },
        "pwebPrivateSubnetAZ2": {
            "Type": "String",
            "Description": "The web server Private SubNet Availability Zone2"
        }
    },
    "Resources": {
        "InstanceProfile": {
            "Properties": {
                "Path": "/",
                "Roles": [
                    {
                        "Ref": "InstanceRole"
                    }
                ]
            },
            "Type": "AWS::IAM::InstanceProfile",
            "Metadata": {
                "AWS::CloudFormation::Designer": {
                    "id": "8197a15b-566b-4a8c-b3df-65c94e66a8ac"
                }
            }
        },
        "InstanceRole": {
            "Properties": {
                "AssumeRolePolicyDocument": {
                    "Statement": [
                        {
                            "Action": [
                                "sts:AssumeRole"
                            ],
                            "Effect": "Allow",
                            "Principal": {
                                "Service": [
                                    "ec2.amazonaws.com"
                                ]
                            }
                        }
                    ]
                },
                "Path": "/"
            },
            "Type": "AWS::IAM::Role",
            "Metadata": {
                "AWS::CloudFormation::Designer": {
                    "id": "2299c10c-fa47-44b0-bdee-d7d90be1573b"
                }
            }
        },
        "rcmScaleDownPolicy": {
            "Properties": {
                "AdjustmentType": "ChangeInCapacity",
                "AutoScalingGroupName": {
                    "Ref": "rcmWebServerFleet"
                },
                "Cooldown": "300",
                "ScalingAdjustment": "-1"
            },
            "Type": "AWS::AutoScaling::ScalingPolicy",
            "Metadata": {
                "AWS::CloudFormation::Designer": {
                    "id": "d2c450a8-3753-47b0-a535-9f76ec0a0150"
                }
            }
        },
        "rcmScaleUpPolicy": {
            "Properties": {
                "AdjustmentType": "ChangeInCapacity",
                "AutoScalingGroupName": {
                    "Ref": "rcmWebServerFleet"
                },
                "Cooldown": "300",
                "ScalingAdjustment": "2"
            },
            "Type": "AWS::AutoScaling::ScalingPolicy",
            "Metadata": {
                "AWS::CloudFormation::Designer": {
                    "id": "d5c4d699-4120-4c84-8962-8ef7f2aef05b"
                }
            }
        },
        "rccScaleDownPolicy": {
            "Properties": {
                "AdjustmentType": "ChangeInCapacity",
                "AutoScalingGroupName": {
                    "Ref": "rccWebServerFleet"
                },
                "Cooldown": "300",
                "ScalingAdjustment": "-1"
            },
            "Type": "AWS::AutoScaling::ScalingPolicy",
            "Metadata": {
                "AWS::CloudFormation::Designer": {
                    "id": "d1f9c103-dfae-4f94-a84c-aefc445d093c"
                }
            }
        },
        "rccScaleUpPolicy": {
            "Properties": {
                "AdjustmentType": "ChangeInCapacity",
                "AutoScalingGroupName": {
                    "Ref": "rccWebServerFleet"
                },
                "Cooldown": "300",
                "ScalingAdjustment": "2"
            },
            "Type": "AWS::AutoScaling::ScalingPolicy",
            "Metadata": {
                "AWS::CloudFormation::Designer": {
                    "id": "3ec5625e-bf60-4607-957b-63ecca792cf9"
                }
            }
        },
        "rbcScaleDownPolicy": {
            "Properties": {
                "AdjustmentType": "ChangeInCapacity",
                "AutoScalingGroupName": {
                    "Ref": "rbcWebServerFleet"
                },
                "Cooldown": "300",
                "ScalingAdjustment": "-1"
            },
            "Type": "AWS::AutoScaling::ScalingPolicy",
            "Metadata": {
                "AWS::CloudFormation::Designer": {
                    "id": "6cb839ed-5870-4360-ba8d-486737af23d6"
                }
            }
        },
        "rbcScaleUpPolicy": {
            "Properties": {
                "AdjustmentType": "ChangeInCapacity",
                "AutoScalingGroupName": {
                    "Ref": "rbcWebServerFleet"
                },
                "Cooldown": "300",
                "ScalingAdjustment": "2"
            },
            "Type": "AWS::AutoScaling::ScalingPolicy",
            "Metadata": {
                "AWS::CloudFormation::Designer": {
                    "id": "537f63a9-f52e-41f9-bac2-c71425c66005"
                }
            }
        },
        "rpcScaleDownPolicy": {
            "Properties": {
                "AdjustmentType": "ChangeInCapacity",
                "AutoScalingGroupName": {
                    "Ref": "rpcWebServerFleet"
                },
                "Cooldown": "300",
                "ScalingAdjustment": "-1"
            },
            "Type": "AWS::AutoScaling::ScalingPolicy",
            "Metadata": {
                "AWS::CloudFormation::Designer": {
                    "id": "13690d61-d910-4277-835d-c31cdcc2482c"
                }
            }
        },
        "rpcScaleUpPolicy": {
            "Properties": {
                "AdjustmentType": "ChangeInCapacity",
                "AutoScalingGroupName": {
                    "Ref": "rpcWebServerFleet"
                },
                "Cooldown": "300",
                "ScalingAdjustment": "2"
            },
            "Type": "AWS::AutoScaling::ScalingPolicy",
            "Metadata": {
                "AWS::CloudFormation::Designer": {
                    "id": "95331a28-0017-47a4-b1d4-39f7754a21db"
                }
            }
        },
        "SecurityGroupRDP": {
            "Properties": {
                "GroupDescription": "Allow RDP to client host",
                "VpcId": {
                    "Ref": "pVPCID"
                },
                "SecurityGroupIngress": [
                    {
                        "CidrIp": {
                            "Ref": "pRDPLocation"
                        },
                        "FromPort": "3389",
                        "IpProtocol": "tcp",
                        "ToPort": "3389"
                    }
                ]
            },
            "Type": "AWS::EC2::SecurityGroup",
            "Metadata": {
                "AWS::CloudFormation::Designer": {
                    "id": "1047d48c-5ffe-4fcf-b3e1-718c409e01ea"
                }
            }
        },
        "SecurityGroupWeb": {
            "Properties": {
                "GroupDescription": "Allow http to client host",
                "VpcId": {
                    "Ref": "pVPCID"
                },
                "SecurityGroupIngress": [
                    {
                        "CidrIp": "0.0.0.0/0",
                        "FromPort": "80",
                        "IpProtocol": "tcp",
                        "ToPort": "80"
                    }
                ]
            },
            "Type": "AWS::EC2::SecurityGroup",
            "Metadata": {
                "AWS::CloudFormation::Designer": {
                    "id": "d3ff9316-bc3f-4ff5-87d6-ca8b214cace5"
                }
            }
        },
        "rgwInternalELB": {
            "Properties": {
                "Subnets": [
                    {
                        "Ref": "pwebPrivateSubnetIDAZ1"
                    },
                    {
                        "Ref": "pwebPrivateSubnetIDAZ2"
                    }
                ],
				"Scheme":"internal",
                "HealthCheck": {
                    "Target": "HTTP:80/",
                    "HealthyThreshold": "2",
                    "UnhealthyThreshold": "5",
                    "Interval": "10",
                    "Timeout": "5"
                },
                "Listeners": [
                    {
                        "InstancePort": "80",
                        "LoadBalancerPort": "80",
                        "Protocol": "HTTP"
                    }
                ]
            },
            "Type": "AWS::ElasticLoadBalancing::LoadBalancer",
            "Metadata": {
                "AWS::CloudFormation::Designer": {
                    "id": "e642419a-5f49-47a2-bd6b-a4389ba96b72"
                }
            }
        },
        "rcmWebServerLCWaitHandle": {
            "Type": "AWS::CloudFormation::WaitConditionHandle",
            "Metadata": {
                "AWS::CloudFormation::Designer": {
                    "id": "753808be-a3a6-484c-ba13-eb3a016e7427"
                }
            }
        },
        "rcmWebServerLCWaitCondition": {
            "Type": "AWS::CloudFormation::WaitCondition",
            "DependsOn": "rcmWebServerLaunchConfig",
            "Properties": {
                "Handle": {
                    "Ref": "rcmWebServerLCWaitHandle"
                },
                "Timeout": "1800"
            },
            "Metadata": {
                "AWS::CloudFormation::Designer": {
                    "id": "6cdbc96f-06c2-4846-8abd-545340addb12"
                }
            }
        },
        "rcmWebServerFleet": {
            "Properties": {
                "AvailabilityZones": [
                    {
                        "Ref": "pwebPrivateSubnetAZ1"
                    },
                    {
                        "Ref": "pwebPrivateSubnetAZ2"
                    }
                ],
                "VPCZoneIdentifier": [
                    {
                        "Ref": "pwebPrivateSubnetIDAZ1"
                    },
                    {
                        "Ref": "pwebPrivateSubnetIDAZ2"
                    }
                ],
                "LaunchConfigurationName": {
                    "Ref": "rcmWebServerLaunchConfig"
                },
				"LoadBalancerNames" : [ {"Fn::ImportValue": "PublicLoadBalancer"} ],
                "MaxSize": "2",
                "MinSize": "1"
            },
            "Type": "AWS::AutoScaling::AutoScalingGroup",
            "Metadata": {
                "AWS::CloudFormation::Designer": {
                    "id": "78a6d66f-9d86-4d12-b87a-797ece19eee3"
                }
            }
        },
        "rcmWebServerLaunchConfig": {
            "Metadata": {
                "AWS::CloudFormation::Init": {
                    "configSets": {
                        "setup": [
                            "setupCfn"
                        ],
                        "deploy": [
                            "stopSite",
                            "startSite"
                        ]
                    },
                    "setupCfn": {
                        "files": {
                            "c:\\cfn\\cfn-hup.conf": {
                                "content": {
                                    "Fn::Join": [
                                        "",
                                        [
                                            "[main]\n",
                                            "stack=",
                                            {
                                                "Ref": "AWS::StackId"
                                            },
                                            "\n",
                                            "region=",
                                            {
                                                "Ref": "AWS::Region"
                                            },
                                            "\n",
                                            "interval=1"
                                        ]
                                    ]
                                }
                            },
                            "c:\\cfn\\hooks.d\\cfn-auto-reloader.conf": {
                                "content": {
                                    "Fn::Join": [
                                        "",
                                        [
                                            "[cfn-auto-reloader-hook]\n",
                                            "triggers=post.update\n",
                                            "path=Resources.rcmWebServerLaunchConfig.Metadata.AWS::CloudFormation::Init\n",
                                            "action=cfn-init.exe -v -c deploy -s ",
                                            {
                                                "Ref": "AWS::StackId"
                                            },
                                            " -r rcmWebServerLaunchConfig",
                                            " --region ",
                                            {
                                                "Ref": "AWS::Region"
                                            },
                                            "\n"
                                        ]
                                    ]
                                }
                            }
                        },
                        "services": {
                            "windows": {
                                "cfn-hup": {
                                    "enabled": "true",
                                    "ensureRunning": "true",
                                    "files": [
                                        "c:\\cfn\\cfn-hup.conf",
                                        "c:\\cfn\\hooks.d\\cfn-auto-reloader.conf"
                                    ]
                                }
                            }
                        }
                    },
                    "stopSite": {
                        "commands": {
                            "1_stop_site": {
                                "command": "iisreset /stop"
                            }
                        }
                    },
                    "startSite": {
                        "commands": {
                            "1_start_site": {
                                "command": "iisreset /start"
                            }
                        }
                    }
                },
                "AWS::CloudFormation::Designer": {
                    "id": "0b848120-da62-4067-b1d7-132c75fb5020"
                }
            },
            "Properties": {
                "IamInstanceProfile": {
                    "Ref": "InstanceProfile"
                },
                "ImageId": "ami-c6e9d9bd",
                "InstanceType": {
                    "Ref": "pWebServerInstanceType"
                },
                "KeyName": {
                    "Ref": "pWebServerKeyName"
                },
                "Tags": [
                    {
                        "Key": "Name",
                        "Value": "rcmWebServerFleet"
                    }
                ],
                "SecurityGroups": [
                    {
                        "Ref": "SecurityGroupWeb"
                    },
                    {
                        "Ref": "SecurityGroupRDP"
                    }
                ],
                "UserData": {
                    "Fn::Base64": {
                        "Fn::Join": [
                            "",
                            [
                                "<powershell>\n",
                                "Add-WindowsFeature Web-WebServer -includeAllSubFeature -logpath $env:temp\\Web-WebServer_feature.log \n",
                                "Add-WindowsFeature Web-Mgmt-Tools -includeAllSubFeature -logpath $env:temp\\Web-Mgmt-Tools_feature.log \n",
                                "remove-website -name \"Default Web Site\" \n",
                                "new-website -name site -port 80 -physicalpath c:\\inetpub\\site -ApplicationPool \".NET v4.5\" -force \n",
                                "</powershell>\n",
                                "<script>\n",
                                "cfn-init.exe -v -c setup -s ",
                                {
                                    "Ref": "AWS::StackId"
                                },
                                " -r rcmWebServerLaunchConfig",
                                " --region ",
                                {
                                    "Ref": "AWS::Region"
                                },
                                "\n",
                                "cfn-signal.exe -e %ERRORLEVEL% \"",
                                {
                                    "Fn::Base64": {
                                        "Ref": "rcmWebServerLCWaitHandle"
                                    }
                                },
                                "\"",
                                "</script>\n"
                            ]
                        ]
                    }
                }
            },
            "Type": "AWS::AutoScaling::LaunchConfiguration"
        },
        "rccWebServerLCWaitHandle": {
            "Type": "AWS::CloudFormation::WaitConditionHandle",
            "Metadata": {
                "AWS::CloudFormation::Designer": {
                    "id": "753808be-a3a6-484c-ba13-eb3a016e7427"
                }
            }
        },
        "rccWebServerLCWaitCondition": {
            "Type": "AWS::CloudFormation::WaitCondition",
            "DependsOn": "rccWebServerLaunchConfig",
            "Properties": {
                "Handle": {
                    "Ref": "rccWebServerLCWaitHandle"
                },
                "Timeout": "1800"
            },
            "Metadata": {
                "AWS::CloudFormation::Designer": {
                    "id": "6cdbc96f-06c2-4846-8abd-545340addb12"
                }
            }
        },
        "rccWebServerFleet": {
            "Properties": {
                "AvailabilityZones": [
                    {
                        "Ref": "pwebPrivateSubnetAZ1"
                    },
                    {
                        "Ref": "pwebPrivateSubnetAZ2"
                    }
                ],
                "VPCZoneIdentifier": [
                    {
                        "Ref": "pwebPrivateSubnetIDAZ1"
                    },
                    {
                        "Ref": "pwebPrivateSubnetIDAZ2"
                    }
                ],
                "LaunchConfigurationName": {
                    "Ref": "rccWebServerLaunchConfig"
                },
				"LoadBalancerNames" : [ {"Fn::ImportValue": "PublicLoadBalancer"} ],
                "MaxSize": "2",
                "MinSize": "1"
            },
            "Type": "AWS::AutoScaling::AutoScalingGroup",
            "Metadata": {
                "AWS::CloudFormation::Designer": {
                    "id": "627b999c-167b-4662-ae31-14cd483eba6c"
                }
            }
        },
        "rccWebServerLaunchConfig": {
            "Metadata": {
                "AWS::CloudFormation::Init": {
                    "configSets": {
                        "setup": [
                            "setupCfn"
                        ],
                        "deploy": [
                            "stopSite",
                            "startSite"
                        ]
                    },
                    "setupCfn": {
                        "files": {
                            "c:\\cfn\\cfn-hup.conf": {
                                "content": {
                                    "Fn::Join": [
                                        "",
                                        [
                                            "[main]\n",
                                            "stack=",
                                            {
                                                "Ref": "AWS::StackId"
                                            },
                                            "\n",
                                            "region=",
                                            {
                                                "Ref": "AWS::Region"
                                            },
                                            "\n",
                                            "interval=1"
                                        ]
                                    ]
                                }
                            },
                            "c:\\cfn\\hooks.d\\cfn-auto-reloader.conf": {
                                "content": {
                                    "Fn::Join": [
                                        "",
                                        [
                                            "[cfn-auto-reloader-hook]\n",
                                            "triggers=post.update\n",
                                            "path=Resources.rccWebServerLaunchConfig.Metadata.AWS::CloudFormation::Init\n",
                                            "action=cfn-init.exe -v -c deploy -s ",
                                            {
                                                "Ref": "AWS::StackId"
                                            },
                                            " -r rccWebServerLaunchConfig",
                                            " --region ",
                                            {
                                                "Ref": "AWS::Region"
                                            },
                                            "\n"
                                        ]
                                    ]
                                }
                            }
                        },
                        "services": {
                            "windows": {
                                "cfn-hup": {
                                    "enabled": "true",
                                    "ensureRunning": "true",
                                    "files": [
                                        "c:\\cfn\\cfn-hup.conf",
                                        "c:\\cfn\\hooks.d\\cfn-auto-reloader.conf"
                                    ]
                                }
                            }
                        }
                    },
                    "stopSite": {
                        "commands": {
                            "1_stop_site": {
                                "command": "iisreset /stop"
                            }
                        }
                    },
                    "startSite": {
                        "commands": {
                            "1_start_site": {
                                "command": "iisreset /start"
                            }
                        }
                    }
                },
                "AWS::CloudFormation::Designer": {
                    "id": "b74e0355-2016-4e82-8830-5b9a7363dcc8"
                }
            },
            "Properties": {
                "IamInstanceProfile": {
                    "Ref": "InstanceProfile"
                },
                "ImageId": "ami-c6e9d9bd",
                "InstanceType": {
                    "Ref": "pWebServerInstanceType"
                },
                "KeyName": {
                    "Ref": "pWebServerKeyName"
                },
                "Tags": [
                    {
                        "Key": "Name",
                        "Value": "rccWebServerFleet"
                    }
                ],
                "SecurityGroups": [
                    {
                        "Ref": "SecurityGroupWeb"
                    },
                    {
                        "Ref": "SecurityGroupRDP"
                    }
                ],
                "UserData": {
                    "Fn::Base64": {
                        "Fn::Join": [
                            "",
                            [
                                "<powershell>\n",
                                "Add-WindowsFeature Web-WebServer -includeAllSubFeature -logpath $env:temp\\Web-WebServer_feature.log \n",
                                "Add-WindowsFeature Web-Mgmt-Tools -includeAllSubFeature -logpath $env:temp\\Web-Mgmt-Tools_feature.log \n",
                                "remove-website -name \"Default Web Site\" \n",
                                "new-website -name site -port 80 -physicalpath c:\\inetpub\\site -ApplicationPool \".NET v4.5\" -force \n",
                                "</powershell>\n",
                                "<script>\n",
                                "cfn-init.exe -v -c setup -s ",
                                {
                                    "Ref": "AWS::StackId"
                                },
                                " -r rccWebServerLaunchConfig",
                                " --region ",
                                {
                                    "Ref": "AWS::Region"
                                },
                                "\n",
                                "cfn-signal.exe -e %ERRORLEVEL% \"",
                                {
                                    "Fn::Base64": {
                                        "Ref": "rccWebServerLCWaitHandle"
                                    }
                                },
                                "\"",
                                "</script>\n"
                            ]
                        ]
                    }
                }
            },
            "Type": "AWS::AutoScaling::LaunchConfiguration"
        },
        "rbcWebServerLCWaitHandle": {
            "Type": "AWS::CloudFormation::WaitConditionHandle",
            "Metadata": {
                "AWS::CloudFormation::Designer": {
                    "id": "753808be-a3a6-484c-ba13-eb3a016e7427"
                }
            }
        },
        "rbcWebServerLCWaitCondition": {
            "Type": "AWS::CloudFormation::WaitCondition",
            "DependsOn": "rbcWebServerLaunchConfig",
            "Properties": {
                "Handle": {
                    "Ref": "rbcWebServerLCWaitHandle"
                },
                "Timeout": "1800"
            },
            "Metadata": {
                "AWS::CloudFormation::Designer": {
                    "id": "6cdbc96f-06c2-4846-8abd-545340addb12"
                }
            }
        },
        "rbcWebServerFleet": {
            "Properties": {
                "AvailabilityZones": [
                    {
                        "Ref": "pwebPrivateSubnetAZ1"
                    },
                    {
                        "Ref": "pwebPrivateSubnetAZ2"
                    }
                ],
                "VPCZoneIdentifier": [
                    {
                        "Ref": "pwebPrivateSubnetIDAZ1"
                    },
                    {
                        "Ref": "pwebPrivateSubnetIDAZ2"
                    }
                ],
                "LaunchConfigurationName": {
                    "Ref": "rbcWebServerLaunchConfig"
                },
				"LoadBalancerNames" : [ {"Fn::ImportValue": "PublicLoadBalancer"} ],
                "MaxSize": "2",
                "MinSize": "1"
            },
            "Type": "AWS::AutoScaling::AutoScalingGroup",
            "Metadata": {
                "AWS::CloudFormation::Designer": {
                    "id": "278dd012-c8bc-4dd9-bda4-4841512638fe"
                }
            }
        },
        "rbcWebServerLaunchConfig": {
            "Metadata": {
                "AWS::CloudFormation::Init": {
                    "configSets": {
                        "setup": [
                            "setupCfn"
                        ],
                        "deploy": [
                            "stopSite",
                            "startSite"
                        ]
                    },
                    "setupCfn": {
                        "files": {
                            "c:\\cfn\\cfn-hup.conf": {
                                "content": {
                                    "Fn::Join": [
                                        "",
                                        [
                                            "[main]\n",
                                            "stack=",
                                            {
                                                "Ref": "AWS::StackId"
                                            },
                                            "\n",
                                            "region=",
                                            {
                                                "Ref": "AWS::Region"
                                            },
                                            "\n",
                                            "interval=1"
                                        ]
                                    ]
                                }
                            },
                            "c:\\cfn\\hooks.d\\cfn-auto-reloader.conf": {
                                "content": {
                                    "Fn::Join": [
                                        "",
                                        [
                                            "[cfn-auto-reloader-hook]\n",
                                            "triggers=post.update\n",
                                            "path=Resources.rbcWebServerLaunchConfig.Metadata.AWS::CloudFormation::Init\n",
                                            "action=cfn-init.exe -v -c deploy -s ",
                                            {
                                                "Ref": "AWS::StackId"
                                            },
                                            " -r rbcWebServerLaunchConfig",
                                            " --region ",
                                            {
                                                "Ref": "AWS::Region"
                                            },
                                            "\n"
                                        ]
                                    ]
                                }
                            }
                        },
                        "services": {
                            "windows": {
                                "cfn-hup": {
                                    "enabled": "true",
                                    "ensureRunning": "true",
                                    "files": [
                                        "c:\\cfn\\cfn-hup.conf",
                                        "c:\\cfn\\hooks.d\\cfn-auto-reloader.conf"
                                    ]
                                }
                            }
                        }
                    },
                    "stopSite": {
                        "commands": {
                            "1_stop_site": {
                                "command": "iisreset /stop"
                            }
                        }
                    },
                    "startSite": {
                        "commands": {
                            "1_start_site": {
                                "command": "iisreset /start"
                            }
                        }
                    }
                },
                "AWS::CloudFormation::Designer": {
                    "id": "14b73c2f-9833-463f-a400-d51b63bfa36b"
                }
            },
            "Properties": {
                "IamInstanceProfile": {
                    "Ref": "InstanceProfile"
                },
                "ImageId": "ami-c6e9d9bd",
                "InstanceType": {
                    "Ref": "pWebServerInstanceType"
                },
                "KeyName": {
                    "Ref": "pWebServerKeyName"
                },
                "Tags": [
                    {
                        "Key": "Name",
                        "Value": "rbcWebServerFleet"
                    }
                ],
                "SecurityGroups": [
                    {
                        "Ref": "SecurityGroupWeb"
                    },
                    {
                        "Ref": "SecurityGroupRDP"
                    }
                ],
                "UserData": {
                    "Fn::Base64": {
                        "Fn::Join": [
                            "",
                            [
                                "<powershell>\n",
                                "Add-WindowsFeature Web-WebServer -includeAllSubFeature -logpath $env:temp\\Web-WebServer_feature.log \n",
                                "Add-WindowsFeature Web-Mgmt-Tools -includeAllSubFeature -logpath $env:temp\\Web-Mgmt-Tools_feature.log \n",
                                "remove-website -name \"Default Web Site\" \n",
                                "new-website -name site -port 80 -physicalpath c:\\inetpub\\site -ApplicationPool \".NET v4.5\" -force \n",
                                "</powershell>\n",
                                "<script>\n",
                                "cfn-init.exe -v -c setup -s ",
                                {
                                    "Ref": "AWS::StackId"
                                },
                                " -r rbcWebServerLaunchConfig",
                                " --region ",
                                {
                                    "Ref": "AWS::Region"
                                },
                                "\n",
                                "cfn-signal.exe -e %ERRORLEVEL% \"",
                                {
                                    "Fn::Base64": {
                                        "Ref": "rbcWebServerLCWaitHandle"
                                    }
                                },
                                "\"",
                                "</script>\n"
                            ]
                        ]
                    }
                }
            },
            "Type": "AWS::AutoScaling::LaunchConfiguration"
        },
        "rpcWebServerLCWaitHandle": {
            "Type": "AWS::CloudFormation::WaitConditionHandle",
            "Metadata": {
                "AWS::CloudFormation::Designer": {
                    "id": "753808be-a3a6-484c-ba13-eb3a016e7427"
                }
            }
        },
        "rpcWebServerLCWaitCondition": {
            "Type": "AWS::CloudFormation::WaitCondition",
            "DependsOn": "rpcWebServerLaunchConfig",
            "Properties": {
                "Handle": {
                    "Ref": "rpcWebServerLCWaitHandle"
                },
                "Timeout": "1800"
            },
            "Metadata": {
                "AWS::CloudFormation::Designer": {
                    "id": "6cdbc96f-06c2-4846-8abd-545340addb12"
                }
            }
        },
        "rpcWebServerFleet": {
            "Properties": {
                "AvailabilityZones": [
                    {
                        "Ref": "pwebPrivateSubnetAZ1"
                    },
                    {
                        "Ref": "pwebPrivateSubnetAZ2"
                    }
                ],
                "VPCZoneIdentifier": [
                    {
                        "Ref": "pwebPrivateSubnetIDAZ1"
                    },
                    {
                        "Ref": "pwebPrivateSubnetIDAZ2"
                    }
                ],
                "LaunchConfigurationName": {
                    "Ref": "rpcWebServerLaunchConfig"
                },
				"LoadBalancerNames" : [ {"Fn::ImportValue": "PublicLoadBalancer"} ],
                "MaxSize": "2",
                "MinSize": "1"
            },
            "Type": "AWS::AutoScaling::AutoScalingGroup",
            "Metadata": {
                "AWS::CloudFormation::Designer": {
                    "id": "b0e9fcb3-ef2e-4ab7-807c-87e486a71980"
                }
            }
        },
        "rpcWebServerLaunchConfig": {
            "Metadata": {
                "AWS::CloudFormation::Init": {
                    "configSets": {
                        "setup": [
                            "setupCfn"
                        ],
                        "deploy": [
                            "stopSite",
                            "startSite"
                        ]
                    },
                    "setupCfn": {
                        "files": {
                            "c:\\cfn\\cfn-hup.conf": {
                                "content": {
                                    "Fn::Join": [
                                        "",
                                        [
                                            "[main]\n",
                                            "stack=",
                                            {
                                                "Ref": "AWS::StackId"
                                            },
                                            "\n",
                                            "region=",
                                            {
                                                "Ref": "AWS::Region"
                                            },
                                            "\n",
                                            "interval=1"
                                        ]
                                    ]
                                }
                            },
                            "c:\\cfn\\hooks.d\\cfn-auto-reloader.conf": {
                                "content": {
                                    "Fn::Join": [
                                        "",
                                        [
                                            "[cfn-auto-reloader-hook]\n",
                                            "triggers=post.update\n",
                                            "path=Resources.rpcWebServerLaunchConfig.Metadata.AWS::CloudFormation::Init\n",
                                            "action=cfn-init.exe -v -c deploy -s ",
                                            {
                                                "Ref": "AWS::StackId"
                                            },
                                            " -r rpcWebServerLaunchConfig",
                                            " --region ",
                                            {
                                                "Ref": "AWS::Region"
                                            },
                                            "\n"
                                        ]
                                    ]
                                }
                            }
                        },
                        "services": {
                            "windows": {
                                "cfn-hup": {
                                    "enabled": "true",
                                    "ensureRunning": "true",
                                    "files": [
                                        "c:\\cfn\\cfn-hup.conf",
                                        "c:\\cfn\\hooks.d\\cfn-auto-reloader.conf"
                                    ]
                                }
                            }
                        }
                    },
                    "stopSite": {
                        "commands": {
                            "1_stop_site": {
                                "command": "iisreset /stop"
                            }
                        }
                    },
                    "startSite": {
                        "commands": {
                            "1_start_site": {
                                "command": "iisreset /start"
                            }
                        }
                    }
                },
                "AWS::CloudFormation::Designer": {
                    "id": "ccc25da1-850a-471f-9db0-4f4eb6a5ee38"
                }
            },
            "Properties": {
                "IamInstanceProfile": {
                    "Ref": "InstanceProfile"
                },
                "ImageId": "ami-c6e9d9bd",
                "InstanceType": {
                    "Ref": "pWebServerInstanceType"
                },
                "KeyName": {
                    "Ref": "pWebServerKeyName"
                },
                "Tags": [
                    {
                        "Key": "Name",
                        "Value": "rcmWebServerFleet"
                    }
                ],
                "SecurityGroups": [
                    {
                        "Ref": "SecurityGroupWeb"
                    },
                    {
                        "Ref": "SecurityGroupRDP"
                    }
                ],
                "UserData": {
                    "Fn::Base64": {
                        "Fn::Join": [
                            "",
                            [
                                "<powershell>\n",
                                "Add-WindowsFeature Web-WebServer -includeAllSubFeature -logpath $env:temp\\Web-WebServer_feature.log \n",
                                "Add-WindowsFeature Web-Mgmt-Tools -includeAllSubFeature -logpath $env:temp\\Web-Mgmt-Tools_feature.log \n",
                                "remove-website -name \"Default Web Site\" \n",
                                "new-website -name site -port 80 -physicalpath c:\\inetpub\\site -ApplicationPool \".NET v4.5\" -force \n",
                                "</powershell>\n",
                                "<script>\n",
                                "cfn-init.exe -v -c setup -s ",
                                {
                                    "Ref": "AWS::StackId"
                                },
                                " -r rpcWebServerLaunchConfig",
                                " --region ",
                                {
                                    "Ref": "AWS::Region"
                                },
                                "\n",
                                "cfn-signal.exe -e %ERRORLEVEL% \"",
                                {
                                    "Fn::Base64": {
                                        "Ref": "rpcWebServerLCWaitHandle"
                                    }
                                },
                                "\"",
                                "</script>\n"
                            ]
                        ]
                    }
                }
            },
            "Type": "AWS::AutoScaling::LaunchConfiguration"
        }
    },
	"Outputs": {
		"gwInternalELB":{
			"Description":"Export ELB to Main stack",
			"Value":{"Ref":"rgwInternalELB"},
			"Export": {
                "Name": "InternalLoadBalancer"
            }
		}
	},	
    "Metadata": {
        "AWS::CloudFormation::Designer": {
            "753808be-a3a6-484c-ba13-eb3a016e7427": {
                "size": {
                    "width": 60,
                    "height": 60
                },
                "position": {
                    "x": 300,
                    "y": 50
                },
                "z": 1,
                "embeds": []
            },
            "e642419a-5f49-47a2-bd6b-a4389ba96b72": {
                "size": {
                    "width": 60,
                    "height": 60
                },
                "position": {
                    "x": 210,
                    "y": -60
                },
                "z": 1,
                "embeds": []
            },
            "d3ff9316-bc3f-4ff5-87d6-ca8b214cace5": {
                "size": {
                    "width": 60,
                    "height": 60
                },
                "position": {
                    "x": 510,
                    "y": 190
                },
                "z": 1,
                "embeds": []
            },
            "1047d48c-5ffe-4fcf-b3e1-718c409e01ea": {
                "size": {
                    "width": 60,
                    "height": 60
                },
                "position": {
                    "x": -50,
                    "y": 210
                },
                "z": 1,
                "embeds": []
            },
            "2299c10c-fa47-44b0-bdee-d7d90be1573b": {
                "size": {
                    "width": 60,
                    "height": 60
                },
                "position": {
                    "x": 30,
                    "y": 60
                },
                "z": 1,
                "embeds": []
            },
            "8197a15b-566b-4a8c-b3df-65c94e66a8ac": {
                "size": {
                    "width": 60,
                    "height": 60
                },
                "position": {
                    "x": 150,
                    "y": 60
                },
                "z": 1,
                "embeds": [],
                "isassociatedwith": [
                    "2299c10c-fa47-44b0-bdee-d7d90be1573b"
                ]
            },
            "ccc25da1-850a-471f-9db0-4f4eb6a5ee38": {
                "size": {
                    "width": 60,
                    "height": 60
                },
                "position": {
                    "x": 50,
                    "y": 220
                },
                "z": 1,
                "embeds": [],
                "isassociatedwith": [
                    "d3ff9316-bc3f-4ff5-87d6-ca8b214cace5",
                    "1047d48c-5ffe-4fcf-b3e1-718c409e01ea"
                ],
                "isrelatedto": [
                    "8197a15b-566b-4a8c-b3df-65c94e66a8ac",
                    "753808be-a3a6-484c-ba13-eb3a016e7427"
                ]
            },
            "b0e9fcb3-ef2e-4ab7-807c-87e486a71980": {
                "size": {
                    "width": 60,
                    "height": 60
                },
                "position": {
                    "x": 50,
                    "y": 310
                },
                "z": 1,
                "embeds": [],
                "isassociatedwith": [
                    "ccc25da1-850a-471f-9db0-4f4eb6a5ee38",
                    "e642419a-5f49-47a2-bd6b-a4389ba96b72"
                ]
            },
            "95331a28-0017-47a4-b1d4-39f7754a21db": {
                "size": {
                    "width": 60,
                    "height": 60
                },
                "position": {
                    "x": 40,
                    "y": 390
                },
                "z": 1,
                "embeds": [],
                "isassociatedwith": [
                    "b0e9fcb3-ef2e-4ab7-807c-87e486a71980"
                ]
            },
            "13690d61-d910-4277-835d-c31cdcc2482c": {
                "size": {
                    "width": 60,
                    "height": 60
                },
                "position": {
                    "x": 40,
                    "y": 480
                },
                "z": 1,
                "embeds": [],
                "isassociatedwith": [
                    "b0e9fcb3-ef2e-4ab7-807c-87e486a71980"
                ]
            },
            "14b73c2f-9833-463f-a400-d51b63bfa36b": {
                "size": {
                    "width": 60,
                    "height": 60
                },
                "position": {
                    "x": 170,
                    "y": 220
                },
                "z": 1,
                "embeds": [],
                "isassociatedwith": [
                    "d3ff9316-bc3f-4ff5-87d6-ca8b214cace5",
                    "1047d48c-5ffe-4fcf-b3e1-718c409e01ea"
                ],
                "isrelatedto": [
                    "8197a15b-566b-4a8c-b3df-65c94e66a8ac",
                    "753808be-a3a6-484c-ba13-eb3a016e7427"
                ]
            },
            "278dd012-c8bc-4dd9-bda4-4841512638fe": {
                "size": {
                    "width": 60,
                    "height": 60
                },
                "position": {
                    "x": 170,
                    "y": 320
                },
                "z": 1,
                "embeds": [],
                "isassociatedwith": [
                    "14b73c2f-9833-463f-a400-d51b63bfa36b",
                    "e642419a-5f49-47a2-bd6b-a4389ba96b72"
                ]
            },
            "537f63a9-f52e-41f9-bac2-c71425c66005": {
                "size": {
                    "width": 60,
                    "height": 60
                },
                "position": {
                    "x": 170,
                    "y": 480
                },
                "z": 1,
                "embeds": [],
                "isassociatedwith": [
                    "278dd012-c8bc-4dd9-bda4-4841512638fe"
                ]
            },
            "6cb839ed-5870-4360-ba8d-486737af23d6": {
                "size": {
                    "width": 60,
                    "height": 60
                },
                "position": {
                    "x": 170,
                    "y": 400
                },
                "z": 1,
                "embeds": [],
                "isassociatedwith": [
                    "278dd012-c8bc-4dd9-bda4-4841512638fe"
                ]
            },
            "b74e0355-2016-4e82-8830-5b9a7363dcc8": {
                "size": {
                    "width": 60,
                    "height": 60
                },
                "position": {
                    "x": 290,
                    "y": 220
                },
                "z": 1,
                "embeds": [],
                "isassociatedwith": [
                    "d3ff9316-bc3f-4ff5-87d6-ca8b214cace5",
                    "1047d48c-5ffe-4fcf-b3e1-718c409e01ea"
                ],
                "isrelatedto": [
                    "8197a15b-566b-4a8c-b3df-65c94e66a8ac",
                    "753808be-a3a6-484c-ba13-eb3a016e7427"
                ]
            },
            "627b999c-167b-4662-ae31-14cd483eba6c": {
                "size": {
                    "width": 60,
                    "height": 60
                },
                "position": {
                    "x": 290,
                    "y": 320
                },
                "z": 1,
                "embeds": [],
                "isassociatedwith": [
                    "b74e0355-2016-4e82-8830-5b9a7363dcc8",
                    "e642419a-5f49-47a2-bd6b-a4389ba96b72"
                ]
            },
            "3ec5625e-bf60-4607-957b-63ecca792cf9": {
                "size": {
                    "width": 60,
                    "height": 60
                },
                "position": {
                    "x": 290,
                    "y": 490
                },
                "z": 1,
                "embeds": [],
                "isassociatedwith": [
                    "627b999c-167b-4662-ae31-14cd483eba6c"
                ]
            },
            "d1f9c103-dfae-4f94-a84c-aefc445d093c": {
                "size": {
                    "width": 60,
                    "height": 60
                },
                "position": {
                    "x": 290,
                    "y": 410
                },
                "z": 1,
                "embeds": [],
                "isassociatedwith": [
                    "627b999c-167b-4662-ae31-14cd483eba6c"
                ]
            },
            "0b848120-da62-4067-b1d7-132c75fb5020": {
                "size": {
                    "width": 60,
                    "height": 60
                },
                "position": {
                    "x": 400,
                    "y": 220
                },
                "z": 1,
                "embeds": [],
                "isassociatedwith": [
                    "d3ff9316-bc3f-4ff5-87d6-ca8b214cace5",
                    "1047d48c-5ffe-4fcf-b3e1-718c409e01ea"
                ],
                "isrelatedto": [
                    "8197a15b-566b-4a8c-b3df-65c94e66a8ac",
                    "753808be-a3a6-484c-ba13-eb3a016e7427"
                ]
            },
            "78a6d66f-9d86-4d12-b87a-797ece19eee3": {
                "size": {
                    "width": 60,
                    "height": 60
                },
                "position": {
                    "x": 400,
                    "y": 320
                },
                "z": 1,
                "embeds": [],
                "isassociatedwith": [
                    "0b848120-da62-4067-b1d7-132c75fb5020",
                    "e642419a-5f49-47a2-bd6b-a4389ba96b72"
                ]
            },
            "d5c4d699-4120-4c84-8962-8ef7f2aef05b": {
                "size": {
                    "width": 60,
                    "height": 60
                },
                "position": {
                    "x": 400,
                    "y": 410
                },
                "z": 1,
                "embeds": [],
                "isassociatedwith": [
                    "78a6d66f-9d86-4d12-b87a-797ece19eee3"
                ]
            },
            "d2c450a8-3753-47b0-a535-9f76ec0a0150": {
                "size": {
                    "width": 60,
                    "height": 60
                },
                "position": {
                    "x": 400,
                    "y": 480
                },
                "z": 1,
                "embeds": [],
                "isassociatedwith": [
                    "78a6d66f-9d86-4d12-b87a-797ece19eee3"
                ]
            },
            "6cdbc96f-06c2-4846-8abd-545340addb12": {
                "size": {
                    "width": 60,
                    "height": 60
                },
                "position": {
                    "x": 420,
                    "y": 50
                },
                "z": 1,
                "embeds": [],
                "references": [
                    "753808be-a3a6-484c-ba13-eb3a016e7427"
                ],
                "dependson": [
                    "0b848120-da62-4067-b1d7-132c75fb5020"
                ]
            }
        }
    }
}