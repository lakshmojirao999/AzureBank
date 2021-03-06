{
    "AWSTemplateFormatVersion": "2010-09-09",
    "Description": "QS(0034) Atlassian Bitbucket Data Center Oct,19,2016",
    "Metadata": {
        "AWS::CloudFormation::Interface": {
            "ParameterGroups": [
                {
                    "Label": {
                        "default": "Bitbucket setup"
                    },
                    "Parameters": [
                        "BitbucketVersion"
                    ]
                },
                {
                    "Label": {
                        "default": "Cluster nodes"
                    },
                    "Parameters": [
                        "ClusterNodeInstanceType",
                        "ClusterNodeMin",
                        "ClusterNodeMax"
                    ]
                },
                {
                    "Label": {
                        "default": "File server"
                    },
                    "Parameters": [
                        "FileServerInstanceType",
                        "HomeSize",
                        "HomeVolumeType",
                        "HomeIops"
                    ]
                },
                {
                    "Label": {
                        "default": "Database"
                    },
                    "Parameters": [
                        "DBInstanceClass",
                        "DBMasterUserPassword",
                        "DBPassword",
                        "DBStorage",
                        "DBStorageType",
                        "DBIops",
                        "DBMultiAZ"
                    ]
                },
                {
                    "Label": {
                        "default": "Elasticsearch"
                    },
                    "Parameters": [
                        "ElasticsearchInstanceType"
                    ]
                },
                {
                    "Label": {
                        "default": "Networking"
                    },
                    "Parameters": [
                        "VPC",
                        "ExternalSubnets",
                        "InternalSubnets",
                        "AssociatePublicIpAddress",
                        "CidrBlock",
                        "KeyName",
                        "SSLCertificateName"
                    ]
                },
                {
                    "Label": {
                        "default": "Advanced (Optional)"
                    },
                    "Parameters": [
                        "DBSnapshotId",
                        "HomeVolumeSnapshotId",
                        "CreateESBucket",
                        "ESBucketName",
                        "ESSnapshotId",
                        "BitbucketProperties",
                        "CatalinaOpts",
                        "AMIOpts",
                        "HomeDeleteOnTermination",
                        "DBMaster",
                        "StartCollectd"
                    ]
                }
            ],
            "ParameterLabels": {
                "AMIOpts": {
                    "default": "AMI Options"
                },
                "AssociatePublicIpAddress": {
                    "default": "Assign public IP"
                },
                "BitbucketProperties": {
                    "default": "Bitbucket properties"
                },
                "BitbucketVersion": {
                    "default": "Version"
                },
                "CatalinaOpts": {
                    "default": "Catalina options"
                },
                "CidrBlock": {
                    "default": "Permitted IP range"
                },
                "ClusterNodeMax": {
                    "default": "Maximum number of cluster nodes"
                },
                "ClusterNodeMin": {
                    "default": "Minimum number of cluster nodes"
                },
                "ClusterNodeInstanceType": {
                    "default": "Bitbucket cluster node instance type"
                },
                "CreateESBucket": {
                    "default": "Create S3 bucket for Elasticsearch snapshots"
                },
                "ESBucketName": {
                    "default": "Elasticsearch snapshot S3 bucket name"
                },
                "ESSnapshotId": {
                    "default": "Elasticsearch snapshot ID to restore"
                },
                "DBInstanceClass": {
                    "default": "RDS instance class"
                },
                "DBMasterUserPassword": {
                    "default": "Master password"
                },
                "DBPassword": {
                    "default": "Bitbucket database password"
                },
                "DBMaster": {
                    "default": "Bitbucket primary database"
                },
                "DBStorage": {
                    "default": "Database storage"
                },
                "DBMultiAZ": {
                    "default": "Enable RDS Multi-AZ deployment"
                },
                "DBStorageType": {
                    "default": "Database storage type"
                },
                "DBIops": {
                    "default": "RDS Provisioned IOPS"
                },
                "DBSnapshotId": {
                    "default": "Database snapshot ID to restore"
                },
                "ElasticsearchInstanceType": {
                    "default": "Elasticsearch instance type"
                },
                "FileServerInstanceType": {
                    "default": "File server instance type"
                },
                "HomeDeleteOnTermination": {
                    "default": "Delete Home on termination"
                },
                "HomeIops": {
                    "default": "Home directory IOPS"
                },
                "HomeVolumeType": {
                    "default": "Home directory volume type"
                },
                "HomeSize": {
                    "default": "Home directory size"
                },
                "HomeVolumeSnapshotId": {
                    "default": "Home volume snapshot ID to restore"
                },
                "KeyName": {
                    "default": "Key Name"
                },
                "SSLCertificateName": {
                    "default": "SSL Certificate Name"
                },
                "StartCollectd": {
                    "default": "Start the collectd service"
                },
                "ExternalSubnets": {
                    "default": "External Subnets"
                },
                "InternalSubnets": {
                    "default": "Internal Subnets"
                },
                "VPC": {
                    "default": "VPC"
                }
            }
        }
    },
    "Parameters": {
        "AMIOpts": {
            "Description": "A comma separated list of options to pass to the AMI",
            "Type": "CommaDelimitedList",
            "Default": ""
        },
        "AssociatePublicIpAddress": {
            "Description": "Controls if the EC2 instances are assigned a public IP address",
            "Type": "String",
            "Default": true,
            "AllowedValues": [
                true,
                false
            ],
            "ConstraintDescription": "Must be 'true' or 'false'."
        },
        "BitbucketProperties": {
            "Description": "A comma-separated list of bitbucket properties in the form key1=value1, key2=value2, ... Find documentation at https://confluence.atlassian.com/x/m5ZKLg",
            "Type": "CommaDelimitedList",
            "Default": ""
        },
        "BitbucketVersion": {
            "Description": "Version of Bitbucket to install, for example: 4.10.0 or higher. Find valid versions at http://go.atlassian.com/bbs-releases",
            "Type": "String",
            "AllowedPattern": "(\\d+\\.\\d+\\.\\d+(-?.*))",
            "ConstraintDescription": "Must be a valid Bitbucket version number. For example: 4.10.0 or higher"
        },
        "CidrBlock": {
            "Description": "The CIDR IP range that is permitted to access the Bitbucket URL. Use 0.0.0.0/0 if you want public access from the internet.",
            "Type": "String",
            "MinLength": 9,
            "MaxLength": 18,
            "AllowedPattern": "(\\d{1,3})\\.(\\d{1,3})\\.(\\d{1,3})\\.(\\d{1,3})/(\\d{1,2})",
            "ConstraintDescription": "Must be a valid IP CIDR range of the form x.x.x.x/x."
        },
        "ClusterNodeMin": {
            "Type": "Number",
            "Default": 1,
            "Description": "Set to 1 for new instances. Can be updated post launch."
        },
        "ClusterNodeMax": {
            "Type": "Number",
            "Default": 2
        },
        "ClusterNodeInstanceType": {
            "Type": "String",
            "Default": "c3.xlarge",
            "AllowedValues": [
				"c3.large",
                "c3.xlarge",
                "c3.2xlarge",
                "c3.4xlarge",
                "c3.8xlarge",
                "i2.xlarge",
                "i2.2xlarge",
                "i2.4xlarge",
                "i2.8xlarge",
                "r3.xlarge",
                "r3.2xlarge",
                "r3.4xlarge",
                "r3.8xlarge",
                "x1.32xlarge"
            ],
            "ConstraintDescription": "Must be an EC2 instance type in the C3, I2, R3, or X1 family, 'xlarge' or larger",
            "Description": "Instance type for the cluster nodes. See https://confluence.atlassian.com/x/GpdKLg for guidance"
        },
        "CatalinaOpts": {
            "Description": "Java options passed to the JVM that runs Bitbucket.",
            "Type": "String",
            "Default": ""
        },
        "CreateESBucket": {
            "Description": "Set to true to create the S3 bucket within this stack, must be used in conjunction with ESBucketName",
            "Type": "String",
            "Default": false,
            "AllowedValues": [
                true,
                false
            ],
            "ConstraintDescription": "Must be 'true' or 'false'."
        },
        "ESBucketName": {
            "Type": "String",
            "Default": "",
            "Description": "Name of a new, or existing, S3 bucket configured for Elasticsearch snapshots",
            "ConstraintDescription": "Must contain only lowercase letters, numbers and hyphens (-).",
            "AllowedPattern": "[a-z0-9-]*"
        },
        "ESSnapshotId": {
            "Type": "String",
            "Default": "",
            "Description": "Must be a valid snapshot ID for a snapshot in the configured S3 snapshot repository, must be used in conjunction with ESBucketName set to a correctly configured bucket",
            "AllowedPattern": "[a-z0-9-]*",
            "ConstraintDescription": "Must contain only lowercase letters, numbers and hyphens (-)."
        },
        "DBInstanceClass": {
            "Type": "String",
            "Default": "db.m4.large",
            "AllowedValues": [
				"db.t2.micro",
                "db.m4.large",
                "db.m4.xlarge",
                "db.m4.2xlarge",
                "db.m4.4xlarge",
                "db.m4.10xlarge",
                "db.r3.large",
                "db.r3.xlarge",
                "db.r3.2xlarge",
                "db.r3.4xlarge",
                "db.r3.8xlarge",
                "db.t2.medium",
                "db.t2.large"
            ],
            "ConstraintDescription": "Must be a valid RDS instance class, 'db.t2.medium' or larger."
        },
        "DBMasterUserPassword": {
            "NoEcho": true,
            "Description": "Password for the master ('postgres') account. Must be 8 - 128 characters.",
            "Type": "String",
            "MinLength": 8,
            "MaxLength": 128,
            "AllowedPattern": "[a-zA-Z0-9]*",
            "ConstraintDescription": "Must be at least 8 alphanumeric characters."
        },
        "DBPassword": {
            "Description": "Password for the Bitbucket user ('atlbitbucket') account. Max length of 128 characters. Not used if you have specified a Database snapshot ID.",
            "Type": "String",
            "MaxLength": 128,
            "AllowedPattern": "[a-zA-Z0-9]*",
            "ConstraintDescription": "If specified, must contain 8 to 128 alphanumeric characters",
            "NoEcho": true
        },
        "DBMaster": {
            "Description": "Database ARN of the RDS instance to replicate. Setting this parameter will bring up Bitbucket as a Disaster recovery standby, with an RDS read replica database.",
            "Default": "",
            "Type": "String",
            "ConstraintDescription": "Must be a valid RDS ARN."
        },
        "DBSnapshotId": {
            "Description": "RDS snapshot ID of an existing backup to restore. Must be used in conjunction with HomeVolumeSnapshotId. Leave blank for a new instance",
            "Type": "String",
            "Default": "",
            "ConstraintDescription": "Must be a valid RDS snapshot ID, or blank."
        },
        "DBStorage": {
            "Description": "Database allocated storage size, in gigabytes (GB). If you choose Provisioned IOPS, storage should be between 100 and 6144",
            "Type": "Number",
            "Default": 10,
            "MinValue": 5,
            "MaxValue": 6144
        },
        "DBMultiAZ": {
            "Type": "String",
            "Default": true,
            "AllowedValues": [
                true,
                false
            ],
            "ConstraintDescription": "Must be 'true' or 'false'."
        },
        "DBStorageType": {
            "Type": "String",
            "Default": "General Purpose (SSD)",
            "AllowedValues": [
                "General Purpose (SSD)",
                "Provisioned IOPS"
            ],
            "ConstraintDescription": "Must be 'General Purpose (SSD)' or 'Provisioned IOPS'."
        },
        "DBIops": {
            "Default": 1000,
            "Description": "Must be in the range of 1000 - 30000 and a multiple of 1000. This value is only used with Provisioned IOPS. Note: The ratio of IOPS per allocated-storage must be between 3.00 and 10.00.",
            "Type": "Number",
            "MinValue": 1000,
            "MaxValue": 30000,
            "ConstraintDescription": "Must be in the range 1000 - 30000."
        },
        "ElasticsearchInstanceType": {
            "Type": "String",
            "Default": "m3.xlarge.elasticsearch",
            "AllowedValues": [
                "m3.large.elasticsearch",
                "m3.xlarge.elasticsearch",
                "m3.2xlarge.elasticsearch",
                "r3.large.elasticsearch",
                "r3.xlarge.elasticsearch",
                "r3.2xlarge.elasticsearch",
                "r3.4xlarge.elasticsearch",
                "r3.8xlarge.elasticsearch",
                "i2.xlarge.elasticsearch",
                "i2.2xlarge.elasticsearch"
            ],
            "ConstraintDescription": "Must be an Elasticsearch instance type in the M3, R3 or I2 family"
        },
        "FileServerInstanceType": {
            "Description": "Instance type for the file server hosting the Bitbucket shared home directory. See https://confluence.atlassian.com/x/GpdKLg for guidance",
            "Type": "String",
            "Default": "m4.xlarge",
            "AllowedValues": [
                "c4.xlarge",
                "c4.2xlarge",
                "c4.4xlarge",
                "c4.8xlarge",
                "m4.xlarge",
                "m4.2xlarge",
                "m4.4xlarge",
                "m4.10xlarge",
                "m4.16xlarge",
                "x1.32xlarge"
            ],
            "ConstraintDescription": "Must be an EC2 instance type in the C4, M4, or X1 family, 'xlarge' or larger."
        },
        "HomeDeleteOnTermination": {
            "Description": "Delete Bitbucket home directory volume when the file server instance is terminated.  You must back up your data before terminating your file server instance if this option is set to 'true'",
            "Type": "String",
            "Default": true,
            "AllowedValues": [
                true,
                false
            ],
            "ConstraintDescription": "Must be 'true' or 'false'."
        },
        "HomeIops": {
            "Description": "Home directory IOPS (100 - 20000, only used with Provisioned IOPS).  Note: The ratio of IOPS provisioned to the volume size requested can be a maximum of 50; for example, a volume with 5000 IOPS must be at least 100 GiB",
            "Type": "Number",
            "Default": 1000,
            "MinValue": 100,
            "MaxValue": 20000,
            "ConstraintDescription": "Must be in the range 100 - 20000."
        },
        "HomeSize": {
            "Description": "Home directory storage size, in gibibytes (GiB) (100 - 16384)",
            "Type": "Number",
            "Default": 100,
            "MinValue": 100,
            "MaxValue": 16384,
            "ConstraintDescription": "Must be in the range 100 - 16384."
        },
        "HomeVolumeSnapshotId": {
            "Description": "EBS snapshot ID of an existing backup to restore as the home directory volume. Must be used in conjunction with DBSnapshotId. Leave blank for a new instance",
            "Type": "String",
            "Default": "",
            "ConstraintDescription": "Must be a valid EBS snapshot ID"
        },
        "HomeVolumeType": {
            "Type": "String",
            "Default": "Provisioned IOPS",
            "AllowedValues": [
                "General Purpose (SSD)",
                "Provisioned IOPS"
            ],
            "ConstraintDescription": "Must be 'General Purpose (SSD)' or 'Provisioned IOPS'."
        },
        "KeyName": {
            "Description": "The EC2 Key Pair to allow SSH access to the instances",
            "Type": "AWS::EC2::KeyPair::KeyName",
            "ConstraintDescription": "Must be the name of an existing EC2 Key Pair."
        },
        "SSLCertificateName": {
            "Description": "The name of your Server Certificate to use for HTTPS. Refer to Amazon documentation for managing your server certificates. Leave blank if you don't want to set up HTTPS at this time",
            "Type": "String",
            "MinLength": 0,
            "MaxLength": 32,
            "Default": ""
        },
        "StartCollectd": {
            "Type": "String",
            "Default": false,
            "AllowedValues": [
                true,
                false
            ],
            "ConstraintDescription": "Must be 'true' or 'false'"
        },
        "ExternalSubnets": {
            "Description": "Subnets (two or more) where your user-facing load balancer will be deployed. MUST be within the selected VPC.",
            "Type": "List<AWS::EC2::Subnet::Id>",
            "ConstraintDescription": "Must be a list of two or more Subnet ID's within the selected VPC."
        },
        "InternalSubnets": {
            "Description": "Subnets (two or more) where your cluster nodes and other internal infrastructure will be deployed. MUST be within the selected VPC. Specify the ExternalSubnets again here if you wish to deploy the whole stack into the same subnets.",
            "Type": "List<AWS::EC2::Subnet::Id>",
            "ConstraintDescription": "Must be a list of two or more Subnet ID's within the selected VPC."
        },
        "VPC": {
            "Description": "Virtual Private Cloud",
            "Type": "AWS::EC2::VPC::Id",
            "ConstraintDescription": "Must be the ID of a VPC."
        }
    },
    "Conditions": {
        "DBProvisionedIops": {
            "Fn::Equals": [
                {
                    "Ref": "DBStorageType"
                },
                "Provisioned IOPS"
            ]
        },
        "SetupCollectd": {
            "Fn::Equals": [
                {
                    "Ref": "StartCollectd"
                },
                true
            ]
        },
        "RestoreFromEBSSnapshot": {
            "Fn::Not": [
                {
                    "Fn::Equals": [
                        {
                            "Ref": "HomeVolumeSnapshotId"
                        },
                        ""
                    ]
                }
            ]
        },
        "RestoreFromRDSSnapshot": {
            "Fn::Not": [
                {
                    "Fn::Equals": [
                        {
                            "Ref": "DBSnapshotId"
                        },
                        ""
                    ]
                }
            ]
        },
        "RestoreFromESSnapshot": {
            "Fn::And": [
                {
                    "Fn::Not": [
                        {
                            "Fn::Equals": [
                                {
                                    "Ref": "ESSnapshotId"
                                },
                                ""
                            ]
                        }
                    ]
                },
                {
                    "Condition": "ESBucketNameSet"
                }
            ]
        },
        "CreateESBucketCondition": {
            "Fn::And": [
                {
                    "Fn::Equals": [
                        {
                            "Ref": "CreateESBucket"
                        },
                        "true"
                    ]
                },
                {
                    "Fn::And": [
                        {
                            "Fn::Not": [
                                {
                                    "Condition": "RestoreFromESSnapshot"
                                }
                            ]
                        },
                        {
                            "Condition": "ESBucketNameSet"
                        }
                    ]
                }
            ]
        },
        "ESBucketNameSet": {
            "Fn::Not": [
                {
                    "Fn::Equals": [
                        {
                            "Ref": "ESBucketName"
                        },
                        ""
                    ]
                }
            ]
        },
        "StandbyMode": {
            "Fn::Not": [
                {
                    "Fn::Equals": [
                        {
                            "Ref": "DBMaster"
                        },
                        ""
                    ]
                }
            ]
        },
        "SetupSSL": {
            "Fn::Not": [
                {
                    "Fn::Equals": [
                        {
                            "Ref": "SSLCertificateName"
                        },
                        ""
                    ]
                }
            ]
        },
        "NotStandbyMode": {
            "Fn::Equals": [
                {
                    "Ref": "DBMaster"
                },
                ""
            ]
        },
        "IsHomeProvisionedIops": {
            "Fn::Equals": [
                {
                    "Ref": "HomeVolumeType"
                },
                "Provisioned IOPS"
            ]
        },
        "IsVersion4X": {
            "Fn::Equals": [
                "4",
                {
                    "Fn::Select": [
                        0,
                        {
                            "Fn::Split": [
                                ".",
                                {
                                    "Ref": "BitbucketVersion"
                                }
                            ]
                        }
                    ]
                }
            ]
        },
        "RestoreRDSOrStandby": {
            "Fn::Or": [
                {
                    "Condition": "RestoreFromRDSSnapshot"
                },
                {
                    "Condition": "StandbyMode"
                }
            ]
        },
        "SetDBMasterUserPassword": {
            "Fn::And": [
                {
                    "Fn::Not": [
                        {
                            "Fn::Equals": [
                                {
                                    "Ref": "DBMasterUserPassword"
                                },
                                ""
                            ]
                        }
                    ]
                },
                {
                    "Condition": "NotStandbyMode"
                }
            ]
        }
    },
    "Mappings": {
        "AWSInstanceType2Arch": {
            "c3.large": {
                "Arch": "HVM64"
            },
            "c3.xlarge": {
                "Arch": "HVM64"
            },
            "c3.2xlarge": {
                "Arch": "HVM64"
            },
            "c3.4xlarge": {
                "Arch": "HVM64"
            },
            "c3.8xlarge": {
                "Arch": "HVM64"
            },
            "c4.large": {
                "Arch": "HVM64"
            },
            "c4.xlarge": {
                "Arch": "HVM64"
            },
            "c4.2xlarge": {
                "Arch": "HVM64"
            },
            "c4.4xlarge": {
                "Arch": "HVM64"
            },
            "c4.8xlarge": {
                "Arch": "HVM64"
            },
            "d2.xlarge": {
                "Arch": "HVM64"
            },
            "d2.2xlarge": {
                "Arch": "HVM64"
            },
            "d2.4xlarge": {
                "Arch": "HVM64"
            },
            "d2.8xlarge": {
                "Arch": "HVM64"
            },
            "i2.xlarge": {
                "Arch": "HVM64"
            },
            "i2.2xlarge": {
                "Arch": "HVM64"
            },
            "i2.4xlarge": {
                "Arch": "HVM64"
            },
            "i2.8xlarge": {
                "Arch": "HVM64"
            },
            "m4.large": {
                "Arch": "HVM64"
            },
            "m4.xlarge": {
                "Arch": "HVM64"
            },
            "m4.2xlarge": {
                "Arch": "HVM64"
            },
            "m4.4xlarge": {
                "Arch": "HVM64"
            },
            "m4.10xlarge": {
                "Arch": "HVM64"
            },
            "m4.16xlarge": {
                "Arch": "HVM64"
            },
            "r3.large": {
                "Arch": "HVM64"
            },
            "r3.xlarge": {
                "Arch": "HVM64"
            },
            "r3.2xlarge": {
                "Arch": "HVM64"
            },
            "r3.4xlarge": {
                "Arch": "HVM64"
            },
            "r3.8xlarge": {
                "Arch": "HVM64"
            },
            "x1.32xlarge": {
                "Arch": "HVM64"
            }
        },
        "AWSRegionArch2AMI": {
            "ap-northeast-1": {
                "HVM64": "ami-a3c9f3c4",
                "HVMG2": "NOT_SUPPORTED"
            },
            "ap-northeast-2": {
                "HVM64": "ami-52924e3c",
                "HVMG2": "NOT_SUPPORTED"
            },
            "ap-south-1": {
                "HVM64": "ami-503e423f",
                "HVMG2": "NOT_SUPPORTED"
            },
            "ap-southeast-1": {
                "HVM64": "ami-79a0261a",
                "HVMG2": "NOT_SUPPORTED"
            },
            "ap-southeast-2": {
                "HVM64": "ami-16160275",
                "HVMG2": "NOT_SUPPORTED"
            },
            "eu-central-1": {
                "HVM64": "ami-6c954e03",
                "HVMG2": "NOT_SUPPORTED"
            },
            "eu-west-1": {
                "HVM64": "ami-d10612b7",
                "HVMG2": "NOT_SUPPORTED"
            },
            "sa-east-1": {
                "HVM64": "ami-0eec8262",
                "HVMG2": "NOT_SUPPORTED"
            },
            "us-east-1": {
                "HVM64": "ami-457b3b53",
                "HVMG2": "NOT_SUPPORTED"
            },
            "us-east-2": {
                "HVM64": "ami-536a4c36",
                "HVMG2": "NOT_SUPPORTED"
            },
            "us-west-1": {
                "HVM64": "ami-49391929",
                "HVMG2": "NOT_SUPPORTED"
            },
            "us-west-2": {
                "HVM64": "ami-0384e463",
                "HVMG2": "NOT_SUPPORTED"
            }
        }
    },
    "Resources": {
        "BitbucketFileServerRole": {
            "Type": "AWS::IAM::Role",
            "Properties": {
                "AssumeRolePolicyDocument": {
                    "Version": "2012-10-17",
                    "Statement": [
                        {
                            "Effect": "Allow",
                            "Principal": {
                                "Service": [
                                    "ec2.amazonaws.com",
                                    "es.amazonaws.com"
                                ]
                            },
                            "Action": [
                                "sts:AssumeRole"
                            ]
                        }
                    ]
                },
                "Path": "/",
                "Policies": [
                    {
                        "PolicyName": "BitbucketFileServerPolicy",
                        "PolicyDocument": {
                            "Version": "2012-10-17",
                            "Statement": [
                                {
                                    "Effect": "Allow",
                                    "Action": [
                                        "ec2:AttachVolume",
                                        "ec2:CopySnapshot",
                                        "ec2:CreateSnapshot",
                                        "ec2:CreateTags",
                                        "ec2:CreateVolume",
                                        "ec2:DeleteSnapshot",
                                        "ec2:DescribeInstances",
                                        "ec2:DescribeSnapshots",
                                        "ec2:DescribeVolumes",
                                        "ec2:DetachVolume",
                                        "rds:AddTagsToResource",
                                        "rds:CopyDBSnapshot",
                                        "rds:CreateDBSnapshot",
                                        "rds:DeleteDBSnapshot",
                                        "rds:DescribeDBInstances",
                                        "rds:DescribeDBSnapshots",
                                        "rds:PromoteReadReplica",
                                        "rds:ModifyDBInstance",
                                        "rds:RestoreDBInstanceFromDBSnapshot",
                                        "iam:PassRole",
                                        "es:*"
                                    ],
                                    "Resource": [
                                        "*"
                                    ]
                                },
                                {
                                    "Fn::If": [
                                        "ESBucketNameSet",
                                        {
                                            "Effect": "Allow",
                                            "Action": [
                                                "s3:DeleteObject",
                                                "s3:GetObject",
                                                "s3:ListBucket",
                                                "s3:PutObject"
                                            ],
                                            "Resource": [
                                                {
                                                    "Fn::Sub": [
                                                        "arn:aws:s3:::${BucketName}",
                                                        {
                                                            "BucketName": {
                                                                "Ref": "ESBucketName"
                                                            }
                                                        }
                                                    ]
                                                },
                                                {
                                                    "Fn::Sub": [
                                                        "arn:aws:s3:::${BucketName}/*",
                                                        {
                                                            "BucketName": {
                                                                "Ref": "ESBucketName"
                                                            }
                                                        }
                                                    ]
                                                }
                                            ]
                                        },
                                        {
                                            "Ref": "AWS::NoValue"
                                        }
                                    ]
                                }
                            ]
                        }
                    }
                ]
            }
        },
        "BitbucketClusterNodeRole": {
            "Type": "AWS::IAM::Role",
            "Properties": {
                "AssumeRolePolicyDocument": {
                    "Version": "2012-10-17",
                    "Statement": [
                        {
                            "Effect": "Allow",
                            "Principal": {
                                "Service": [
                                    "ec2.amazonaws.com"
                                ]
                            },
                            "Action": [
                                "sts:AssumeRole"
                            ]
                        }
                    ]
                },
                "Path": "/",
                "Policies": [
                    {
                        "PolicyName": "BitbucketClusterNodePolicy",
                        "PolicyDocument": {
                            "Version": "2012-10-17",
                            "Statement": [
                                {
                                    "Action": [
                                        "ec2:DescribeInstances"
                                    ],
                                    "Effect": "Allow",
                                    "Resource": [
                                        "*"
                                    ]
                                }
                            ]
                        }
                    }
                ]
            }
        },
        "BitbucketFileServerInstanceProfile": {
            "Type": "AWS::IAM::InstanceProfile",
            "Properties": {
                "Path": "/",
                "Roles": [
                    {
                        "Ref": "BitbucketFileServerRole"
                    }
                ]
            }
        },
        "BitbucketClusterNodeInstanceProfile": {
            "Type": "AWS::IAM::InstanceProfile",
            "Properties": {
                "Path": "/",
                "Roles": [
                    {
                        "Ref": "BitbucketClusterNodeRole"
                    }
                ]
            }
        },
        "ClusterNodeGroup": {
            "Type": "AWS::AutoScaling::AutoScalingGroup",
            "CreationPolicy": {
                "ResourceSignal": {
                    "Count": "1",
                    "Timeout": "PT30M"
                }
            },
            "Properties": {
                "DesiredCapacity": {
                    "Fn::If": [
                        "StandbyMode",
                        0,
                        {
                            "Ref": "ClusterNodeMin"
                        }
                    ]
                },
                "LaunchConfigurationName": {
                    "Ref": "ClusterNodeLaunchConfig"
                },
                "MaxSize": {
                    "Ref": "ClusterNodeMax"
                },
                "MinSize": {
                    "Fn::If": [
                        "StandbyMode",
                        0,
                        {
                            "Ref": "ClusterNodeMin"
                        }
                    ]
                },
                "LoadBalancerNames": [
                    {
                        "Ref": "LoadBalancer"
                    }
                ],
                "VPCZoneIdentifier": {
                    "Ref": "InternalSubnets"
                },
                "Tags": [
                    {
                        "Key": "Name",
                        "Value": "Bitbucket Node",
                        "PropagateAtLaunch": true
                    },
                    {
                        "Key": "Cluster",
                        "Value": {
                            "Ref": "AWS::StackName"
                        },
                        "PropagateAtLaunch": true
                    }
                ]
            }
        },
        "ClusterNodeLaunchConfig": {
            "Type": "AWS::AutoScaling::LaunchConfiguration",
            "Metadata": {
                "AWS::CloudFormation::Init": {
                    "1": {
                        "packages": {
                            "Fn::If": [
                                "SetupCollectd",
                                {
                                    "yum": {
                                        "collectd": [],
                                        "collectd-java": [],
                                        "collectd-generic-jmx": [],
                                        "collectd-rrdtool": []
                                    }
                                },
                                {
                                    "Ref": "AWS::NoValue"
                                }
                            ]
                        },
                        "files": {
                            "/etc/atl": {
                                "content": {
                                    "Fn::Join": [
                                        "\n",
                                        [
                                            "ATL_APP_DATA_MOUNT_ENABLED=false",
                                            {
                                                "Fn::Sub": [
                                                    "ATL_DB_PASSWORD=${DBMasterUserPassword}",
                                                    {
                                                        "DBMasterUserPassword": {
                                                            "Ref": "DBMasterUserPassword"
                                                        }
                                                    }
                                                ]
                                            },
                                            "ATL_DB_NAME=bitbucket",
                                            {
                                                "Fn::Sub": [
                                                    "ATL_DB_HOST=${DBEndpointAddress}",
                                                    {
                                                        "DBEndpointAddress": {
                                                            "Fn::GetAtt": [
                                                                "DB",
                                                                "Endpoint.Address"
                                                                
                                                            ]
                                                        }
                                                    }
                                                ]
                                            },
                                            {
                                                "Fn::Sub": [
                                                    "ATL_DB_PORT=${DBEndpointPort}",
                                                    {
                                                        "DBEndpointPort": {
                                                            "Fn::GetAtt": [
                                                                "DB",
                                                                "Endpoint.Port"
                                                                
                                                            ]
                                                        }
                                                    }
                                                ]
                                            },
                                            "ATL_JDBC_DRIVER=org.postgresql.Driver",
                                            {
                                                "Fn::Sub": [
                                                    "ATL_JDBC_URL=jdbc:postgresql://${DBEndpointAddress}:${DBEndpointPort}/bitbucket",
                                                    {
                                                        "DBEndpointAddress": {
                                                            "Fn::GetAtt": [
                                                                "DB",
                                                                "Endpoint.Address"
                                                               
                                                            ]
                                                        },
                                                        "DBEndpointPort": {
                                                            "Fn::GetAtt": [
                                                                "DB",
                                                                "Endpoint.Port"
                                                             
                                                            ]
                                                        }
                                                    }
                                                ]
                                            },
                                            "ATL_JDBC_USER=atlbitbucket",
                                            {
                                                "Fn::Sub": [
                                                    "ATL_JDBC_PASSWORD=${DBPassword}",
                                                    {
                                                        "DBPassword": {
                                                            "Ref": "DBPassword"
                                                        }
                                                    }
                                                ]
                                            },
                                            {
                                                "Fn::Sub": [
                                                    "ATL_BITBUCKET_PROPERTIES=\"${BitbucketProperties}",
                                                    {
                                                        "BitbucketProperties": {
                                                            "Fn::Join": [
                                                                "\n",
                                                                {
                                                                    "Ref": "BitbucketProperties"
                                                                }
                                                            ]
                                                        }
                                                    }
                                                ]
                                            },
                                            "hazelcast.network.aws=true",
                                            {
                                                "Fn::Sub": [
                                                    "hazelcast.network.aws.iam.role=${BitbucketClusterNodeRole}",
                                                    {
                                                        "BitbucketClusterNodeRole": {
                                                            "Ref": "BitbucketClusterNodeRole"
                                                        }
                                                    }
                                                ]
                                            },
                                            {
                                                "Fn::Sub": [
                                                    "hazelcast.network.aws.region=${Region}",
                                                    {
                                                        "Region": {
                                                            "Ref": "AWS::Region"
                                                        }
                                                    }
                                                ]
                                            },
                                            "hazelcast.network.aws.tag.key=Cluster",
                                            {
                                                "Fn::Sub": [
                                                    "hazelcast.network.aws.tag.value=${StackName}",
                                                    {
                                                        "StackName": {
                                                            "Ref": "AWS::StackName"
                                                        }
                                                    }
                                                ]
                                            },
                                            "hazelcast.network.multicast=false",
                                            {
                                                "Fn::Sub": [
                                                    "hazelcast.group.name=${StackName}",
                                                    {
                                                        "StackName": {
                                                            "Ref": "AWS::StackName"
                                                        }
                                                    }
                                                ]
                                            },
                                            {
                                                "Fn::Sub": [
                                                    "hazelcast.group.password=${StackName}",
                                                    {
                                                        "StackName": {
                                                            "Ref": "AWS::StackName"
                                                        }
                                                    }
                                                ]
                                            },
                                            {
                                                "Fn::Sub": [
                                                    "plugin.search.elasticsearch.aws.region=${Region}",
                                                    {
                                                        "Region": {
                                                            "Ref": "AWS::Region"
                                                        }
                                                    }
                                                ]
                                            },
                                            {
                                                "Fn::Sub": [
                                                    "plugin.search.elasticsearch.baseurl=http://${ESEndpoint}\"",
                                                    {
                                                        "ESEndpoint": {
                                                            "Fn::GetAtt": [
                                                                "Elasticsearch",
                                                                "DomainEndpoint"
                                                            ]
                                                        }
                                                    }
                                                ]
                                            },
                                            {
                                                "Fn::Sub": [
                                                    "ATL_BITBUCKET_VERSION=${BitbucketVersion}",
                                                    {
                                                        "BitbucketVersion": {
                                                            "Ref": "BitbucketVersion"
                                                        }
                                                    }
                                                ]
                                            },
                                            "ATL_BITBUCKET_BUNDLED_ELASTICSEARCH_ENABLED=false",
                                            "ATL_NGINX_ENABLED=false",
                                            "ATL_POSTGRES_ENABLED=false",
                                            {
                                                "Fn::Sub": [
                                                    "ATL_PROXY_NAME=${LoadBalancerDNSName}",
                                                    {
                                                        "LoadBalancerDNSName": {
                                                            "Fn::GetAtt": [
                                                                "LoadBalancer",
                                                                "DNSName"
                                                            ]
                                                        }
                                                    }
                                                ]
                                            },
                                            "ATL_SSL_SELF_CERT_ENABLED=false",
                                            {
                                                "Fn::If": [
                                                    "SetupSSL",
                                                    "ATL_SSL_PROXY=true",
                                                    {
                                                        "Ref": "AWS::NoValue"
                                                    }
                                                ]
                                            },
                                            {
                                                "Fn::Join": [
                                                    "\n",
                                                    {
                                                        "Ref": "AMIOpts"
                                                    }
                                                ]
                                            }
                                        ]
                                    ]
                                }
                            },
                            "/etc/cfn/cfn-hup.conf": {
                                "content": {
                                    "Fn::Join": [
                                        "\n",
                                        [
                                            "[main]",
                                            {
                                                "Fn::Sub": [
                                                    "stack=${StackId}",
                                                    {
                                                        "StackId": {
                                                            "Ref": "AWS::StackId"
                                                        }
                                                    }
                                                ]
                                            },
                                            {
                                                "Fn::Sub": [
                                                    "region=${Region}",
                                                    {
                                                        "Region": {
                                                            "Ref": "AWS::Region"
                                                        }
                                                    }
                                                ]
                                            }
                                        ]
                                    ]
                                },
                                "mode": 256,
                                "owner": "root",
                                "group": "root"
                            },
                            "/etc/cfn/hooks.d/cfn-auto-reloader.conf": {
                                "content": {
                                    "Fn::Join": [
                                        "\n",
                                        [
                                            "[cfn-auto-reloader-hook]",
                                            "triggers=post.update",
                                            "path=Resources.ClusterNodeLaunchConfig.Metadata.AWS::CloudFormation::Init",
                                            {
                                                "Fn::Sub": [
                                                    "action=/opt/aws/bin/cfn-init -v --stack ${StackName} --resource ClusterNodeLaunchConfig --region ${Region}",
                                                    {
                                                        "StackName": {
                                                            "Ref": "AWS::StackName"
                                                        },
                                                        "Region": {
                                                            "Ref": "AWS::Region"
                                                        }
                                                    }
                                                ]
                                            },
                                            "runas=root"
                                        ]
                                    ]
                                }
                            },
                            "/home/atlbitbucket/.bash_profile": {
                                "content": {
                                    "Fn::Join": [
                                        "\n",
                                        [
                                            "if [ -f ~/.bashrc ]; then",
                                            ". ~/.bashrc",
                                            "fi",
                                            {
                                                "Fn::Sub": [
                                                    "export CATALINA_OPTS=\"${CatalinaOpts}\"",
                                                    {
                                                        "CatalinaOpts": {
                                                            "Ref": "CatalinaOpts"
                                                        }
                                                    }
                                                ]
                                            }
                                        ]
                                    ]
                                },
                                "mode": 420,
                                "owner": "atlbitbucket",
                                "group": "atlbitbucket"
                            }
                        },
                        "commands": {
                            "010_add_nfs_mount": {
                                "command": {
                                    "Fn::Sub": [
                                        "echo ${FileServerPrivateIp}:/media/atl/bitbucket/shared /media/atl/bitbucket/shared nfs lookupcache=pos,noatime,intr,rsize=32768,wsize=32768 0 0 >>/etc/fstab",
                                        {
                                            "FileServerPrivateIp": {
                                                "Fn::GetAtt": [
                                                    "FileServer",
                                                    "PrivateIp"
                                                ]
                                            }
                                        }
                                    ]
                                },
                                "ignoreErrors": false
                            },
                            "020_make_shared_home_dir": {
                                "command": "mkdir -p /media/atl/bitbucket/shared",
                                "ignoreErrors": false
                            },
                            "030_chown_shared_home_dir": {
                                "command": "chown atlbitbucket:atlbitbucket /media/atl/bitbucket /media/atl/bitbucket/shared",
                                "ignoreErrors": false
                            }
                        },
                        "services": {
                            "sysvinit": {
                                "cfn-hup": {
                                    "enabled": true,
                                    "ensureRunning": true,
                                    "files": [
                                        "/etc/cfn/cfn-hup.conf",
                                        "/etc/cfn/hooks.d/cfn-auto-reloader.conf"
                                    ]
                                },
                                "collectd": {
                                    "Fn::If": [
                                        "SetupCollectd",
                                        {
                                            "enabled": true,
                                            "ensureRunning": true
                                        },
                                        {
                                            "Ref": "AWS::NoValue"
                                        }
                                    ]
                                },
                                "rpcbind": {
                                    "enabled": true,
                                    "ensureRunning": true,
                                    "packages": {
                                        "yum": [
                                            "nfs-utils"
                                        ]
                                    }
                                }
                            }
                        }
                    },
                    "2": {
                        "commands": {
                            "040_mount_nfs": {
                                "command": "bash -c \"until mount /media/atl/bitbucket/shared; do echo 'Mount of shared volume failed trying again in 5 seconds.'; sleep 5; done\"",
                                "ignoreErrors": false
                            }
                        },
                        "services": {
                            "sysvinit": {
                                "nfslock": {
                                    "enabled": true,
                                    "ensureRunning": true,
                                    "packages": {
                                        "yum": [
                                            "nfs-utils"
                                        ]
                                    }
                                }
                            }
                        }
                    },
                    "configSets": {
                        "default": [
                            1,
                            2
                        ]
                    }
                }
            },
            "Properties": {
                "AssociatePublicIpAddress": {
                    "Ref": "AssociatePublicIpAddress"
                },
                "BlockDeviceMappings": [
                    {
                        "DeviceName": "/dev/xvdf",
                        "Ebs": {},
                        "NoDevice": true
                    }
                ],
                "KeyName": {
                    "Ref": "KeyName"
                },
                "IamInstanceProfile": {
                    "Ref": "BitbucketClusterNodeInstanceProfile"
                },
                "ImageId": {
                    "Fn::FindInMap": [
                        "AWSRegionArch2AMI",
                        {
                            "Ref": "AWS::Region"
                        },
                        {
                            "Fn::FindInMap": [
                                "AWSInstanceType2Arch",
                                {
                                    "Ref": "ClusterNodeInstanceType"
                                },
                                "Arch"
                            ]
                        }
                    ]
                },
                "InstanceType": {
                    "Ref": "ClusterNodeInstanceType"
                },
                "SecurityGroups": [
                    {
                        "Ref": "SecurityGroup"
                    }
                ],
                "UserData": {
                    "Fn::Base64": {
                        "Fn::Join": [
                            "",
                            [
                                "#!/bin/bash -xe\n",
                                "yum update -y aws-cfn-bootstrap\n",
                                {
                                    "Fn::Sub": [
                                        "/opt/aws/bin/cfn-init -v --stack ${StackName}",
                                        {
                                            "StackName": {
                                                "Ref": "AWS::StackName"
                                            }
                                        }
                                    ]
                                },
                                {
                                    "Fn::Sub": [
                                        " --resource ClusterNodeLaunchConfig --region ${Region}\n",
                                        {
                                            "Region": {
                                                "Ref": "AWS::Region"
                                            }
                                        }
                                    ]
                                },
                                {
                                    "Fn::Sub": [
                                        "/opt/aws/bin/cfn-signal -e $? --stack ${StackName}",
                                        {
                                            "StackName": {
                                                "Ref": "AWS::StackName"
                                            }
                                        }
                                    ]
                                },
                                {
                                    "Fn::Sub": [
                                        " --resource ClusterNodeGroup --region ${Region}",
                                        {
                                            "Region": {
                                                "Ref": "AWS::Region"
                                            }
                                        }
                                    ]
                                }
                            ]
                        ]
                    }
                }
            }
        },
        "ClusterNodeScaleUpPolicy": {
            "Type": "AWS::AutoScaling::ScalingPolicy",
            "Properties": {
                "AdjustmentType": "ChangeInCapacity",
                "AutoScalingGroupName": {
                    "Ref": "ClusterNodeGroup"
                },
                "Cooldown": 600,
                "ScalingAdjustment": 1
            }
        },
        "ClusterNodeScaleDownPolicy": {
            "Type": "AWS::AutoScaling::ScalingPolicy",
            "Properties": {
                "AdjustmentType": "ChangeInCapacity",
                "AutoScalingGroupName": {
                    "Ref": "ClusterNodeGroup"
                },
                "Cooldown": 600,
                "ScalingAdjustment": -1
            }
        },
        "CPUAlarmHigh": {
            "Type": "AWS::CloudWatch::Alarm",
            "Properties": {
                "AlarmDescription": "Scale up if CPU > 60% for 5 minutes",
                "MetricName": "CPUUtilization",
                "Namespace": "AWS/EC2",
                "Statistic": "Average",
                "Period": 60,
                "EvaluationPeriods": 5,
                "Threshold": 60,
                "AlarmActions": [
                    {
                        "Ref": "ClusterNodeScaleUpPolicy"
                    }
                ],
                "Dimensions": [
                    {
                        "Name": "AutoScalingGroupName",
                        "Value": {
                            "Ref": "ClusterNodeGroup"
                        }
                    }
                ],
                "ComparisonOperator": "GreaterThanThreshold"
            }
        },
        "CPUAlarmLow": {
            "Type": "AWS::CloudWatch::Alarm",
            "Properties": {
                "AlarmDescription": "Scale down if CPU < 40% for 30 minutes",
                "MetricName": "CPUUtilization",
                "Namespace": "AWS/EC2",
                "Statistic": "Average",
                "Period": 60,
                "EvaluationPeriods": 30,
                "Threshold": 40,
                "AlarmActions": [
                    {
                        "Ref": "ClusterNodeScaleDownPolicy"
                    }
                ],
                "Dimensions": [
                    {
                        "Name": "AutoScalingGroupName",
                        "Value": {
                            "Ref": "ClusterNodeGroup"
                        }
                    }
                ],
                "ComparisonOperator": "LessThanThreshold"
            }
        },
        "Elasticsearch": {
            "Type": "AWS::Elasticsearch::Domain",
            "Properties": {
                "ElasticsearchVersion": 2.3,
                "ElasticsearchClusterConfig": {
                    "InstanceType": {
                        "Ref": "ElasticsearchInstanceType"
                    }
                },
                "AccessPolicies": {
                    "Version": "2012-10-17",
                    "Statement": [
                        {
                            "Effect": "Allow",
                            "Principal": {
                                "AWS": {
                                    "Fn::GetAtt": [
                                        "BitbucketClusterNodeRole",
                                        "Arn"
                                    ]
                                }
                            },
                            "Action": "es:*",
                            "Resource": "*"
                        }
                    ]
                },
                "Tags": [
                    {
                        "Key": "Name",
                        "Value": "Bitbucket Elasticsearch cluster"
                    },
                    {
                        "Key": "Application",
                        "Value": {
                            "Ref": "AWS::StackId"
                        }
                    }
                ]
            }
        },
        "ElasticsearchBucket": {
            "Type": "AWS::S3::Bucket",
            "Condition": "CreateESBucketCondition",
            "Properties": {
                "BucketName": {
                    "Ref": "ESBucketName"
                },
                "Tags": [
                    {
                        "Key": "Cluster",
                        "Value": {
                            "Ref": "AWS::StackName"
                        }
                    }
                ]
            }
        },
        "FileServer": {
            "Type": "AWS::EC2::Instance",
            "CreationPolicy": {
                "ResourceSignal": {
                    "Count": "1",
                    "Timeout": "PT30M"
                }
            },
            "Metadata": {
                "Comment": "Set up NFS Server and initial bitbucket.properties",
                "AWS::CloudFormation::Init": {
                    "1": {
                        "packages": {
                            "Fn::If": [
                                "SetupCollectd",
                                {
                                    "yum": {
                                        "collectd": [],
                                        "collectd-java": [],
                                        "collectd-generic-jmx": [],
                                        "collectd-rrdtool": []
                                    }
                                },
                                {
                                    "Ref": "AWS::NoValue"
                                }
                            ]
                        },
                        "files": {
                            "/etc/atl": {
                                "content": {
                                    "Fn::Join": [
                                        "\n",
                                        [
                                            "ATL_ENABLED_PRODUCTS=",
                                            "ATL_ENABLED_SHARED_HOMES=Bitbucket",
                                            "ATL_NGINX_ENABLED=false",
                                            "ATL_POSTGRES_ENABLED=false",
                                            "ATL_SSL_SELF_CERT_ENABLED=false",
                                            "ATL_BITBUCKET_BUNDLED_ELASTICSEARCH_ENABLED=false",
                                            "ATL_APP_NFS_SERVER=true"
                                        ]
                                    ]
                                }
                            },
                            "/etc/cfn/cfn-hup.conf": {
                                "content": {
                                    "Fn::Join": [
                                        "\n",
                                        [
                                            "[main]",
                                            {
                                                "Fn::Sub": [
                                                    "stack=${StackId}",
                                                    {
                                                        "StackId": {
                                                            "Ref": "AWS::StackId"
                                                        }
                                                    }
                                                ]
                                            },
                                            {
                                                "Fn::Sub": [
                                                    "region=${Region}",
                                                    {
                                                        "Region": {
                                                            "Ref": "AWS::Region"
                                                        }
                                                    }
                                                ]
                                            }
                                        ]
                                    ]
                                },
                                "mode": 256,
                                "owner": "root",
                                "group": "root"
                            },
                            "/etc/cfn/hooks.d/cfn-auto-reloader.conf": {
                                "content": {
                                    "Fn::Join": [
                                        "\n",
                                        [
                                            "[cfn-auto-reloader-hook]",
                                            "triggers=post.update",
                                            "path=Resources.FileServer.Metadata.AWS::CloudFormation::Init",
                                            {
                                                "Fn::Sub": [
                                                    "action=/opt/aws/bin/cfn-init -v --stack ${StackName} --resource FileServer --region ${Region}",
                                                    {
                                                        "Region": {
                                                            "Ref": "AWS::Region"
                                                        },
                                                        "StackName": {
                                                            "Ref": "AWS::StackName"
                                                        }
                                                    }
                                                ]
                                            },
                                            "runas=root"
                                        ]
                                    ]
                                }
                            },
                            "/opt/atlassian/bitbucket-diy-backup/bitbucket.diy-backup.vars.sh": {
                                "content": {
                                    "Fn::Join": [
                                        "\n",
                                        [
                                            "# This file was generated from the BitbucketDataCenter CloudFormation template",
                                            {
                                                "Fn::Sub": [
                                                    "INSTANCE_NAME=${StackName}",
                                                    {
                                                        "StackName": {
                                                            "Ref": "AWS::StackName"
                                                        }
                                                    }
                                                ]
                                            },
                                            {
                                                "Fn::Sub": [
                                                    "BITBUCKET_URL=${HTTP}://${LoadBalancerDNSName}",
                                                    {
                                                        "HTTP": {
                                                            "Fn::If": [
                                                                "SetupSSL",
                                                                "https",
                                                                "http"
                                                            ]
                                                        },
                                                        "LoadBalancerDNSName": {
                                                            "Fn::GetAtt": [
                                                                "LoadBalancer",
                                                                "DNSName"
                                                            ]
                                                        }
                                                    }
                                                ]
                                            },
                                            "BITBUCKET_HOME=/media/atl/bitbucket",
                                            "BITBUCKET_UID=atlbitbucket",
                                            "BITBUCKET_GID=atlbitbucket",
                                            {
                                                "Fn::If": [
                                                    "StandbyMode",
                                                    "BACKUP_HOME_TYPE=${BACKUP_HOME_TYPE:-zfs}",
                                                    "BACKUP_HOME_TYPE=${BACKUP_HOME_TYPE:-amazon-ebs}"
                                                ]
                                            },
                                            "BACKUP_DATABASE_TYPE=${BACKUP_DATABASE_TYPE:-amazon-rds}",
                                            "BACKUP_ARCHIVE_TYPE=",
                                            "BACKUP_ELASTICSEARCH_TYPE=amazon-es",
                                            "BACKUP_ZERO_DOWNTIME=true",
                                            "HOME_DIRECTORY_MOUNT_POINT=/media/atl",
                                            "HOME_DIRECTORY_DEVICE_NAME=/dev/sdf",
                                            {
                                                "Fn::Sub": [
                                                    "RESTORE_HOME_DIRECTORY_VOLUME_TYPE=${HomeProvisionedIops}",
                                                    {
                                                        "HomeProvisionedIops": {
                                                            "Fn::If": [
                                                                "IsHomeProvisionedIops",
                                                                "io1",
                                                                "gp2"
                                                            ]
                                                        }
                                                    }
                                                ]
                                            },
                                            {
                                                "Fn::If": [
                                                    "IsHomeProvisionedIops",
                                                    {
                                                        "Fn::Sub": [
                                                            "RESTORE_HOME_DIRECTORY_IOPS=${HomeIops}",
                                                            {
                                                                "HomeIops": {
                                                                    "Ref": "HomeIops"
                                                                }
                                                            }
                                                        ]
                                                    },
                                                    {
                                                        "Ref": "AWS::NoValue"
                                                    }
                                                ]
                                            },
                                            "FILESYSTEM_TYPE=zfs",
                                            "ZFS_HOME_TANK_NAME=$(run sudo zfs list -H -o name,mountpoint | grep \"${HOME_DIRECTORY_MOUNT_POINT}\" | cut -f1)",
                                            {
                                                "Fn::Sub": [
                                                    "RDS_INSTANCE_ID=${DB}",
                                                    {
                                                        "DB": {
                                                            "Ref": "DB"
                                                        }
                                                    }
                                                ]
                                            },
                                            {
                                                "Fn::Sub": [
                                                    "RESTORE_RDS_INSTANCE_CLASS=${DBInstanceClass}",
                                                    {
                                                        "DBInstanceClass": {
                                                            "Ref": "DBInstanceClass"
                                                        }
                                                    }
                                                ]
                                            },
                                            {
                                                "Fn::Sub": [
                                                    "RESTORE_RDS_MULTI_AZ=${DBMultiAZ}",
                                                    {
                                                        "DBMultiAZ": {
                                                            "Ref": "DBMultiAZ"
                                                        }
                                                    }
                                                ]
                                            },
                                            {
                                                "Fn::Sub": [
                                                    "RESTORE_RDS_SUBNET_GROUP_NAME=${DBSubnetGroup}",
                                                    {
                                                        "DBSubnetGroup": {
                                                            "Ref": "DBSubnetGroup"
                                                        }
                                                    }
                                                ]
                                            },
                                            {
                                                "Fn::Sub": [
                                                    "RESTORE_RDS_SECURITY_GROUP=${SecurityGroup}",
                                                    {
                                                        "SecurityGroup": {
                                                            "Ref": "SecurityGroup"
                                                        }
                                                    }
                                                ]
                                            },
                                            "CURL_OPTIONS=\"-L -s -f\"",
                                            {
                                                "Fn::Sub": [
                                                    "AWS_REGION=${Region}",
                                                    {
                                                        "Region": {
                                                            "Ref": "AWS::Region"
                                                        }
                                                    }
                                                ]
                                            },
                                            "AWS_INFO=$(curl ${CURL_OPTIONS} http://169.254.169.254/latest/dynamic/instance-identity/document)",
                                            "AWS_ACCOUNT_ID=$(echo \"${AWS_INFO}\" | jq -r .accountId)",
                                            "AWS_AVAILABILITY_ZONE=$(echo \"${AWS_INFO}\" | jq -r .availabilityZone)",
                                            "AWS_REGION=$(echo \"${AWS_INFO}\" | jq -r .region)",
                                            "AWS_EC2_INSTANCE_ID=$(echo \"${AWS_INFO}\" | jq -r .instanceId)",
                                            "AWS_ADDITIONAL_TAGS=",
                                            "BITBUCKET_VERBOSE_BACKUP=${BITBUCKET_VERBOSE_BACKUP:-true}",
                                            "KEEP_BACKUPS=5",
                                            "ELASTICSEARCH_REPOSITORY_NAME=bitbucket-snapshots",
                                            "ELASTICSEARCH_INDEX_NAME=bitbucket-search-v1",
                                            {
                                                "Fn::Sub": [
                                                    "ELASTICSEARCH_S3_BUCKET=${BucketName}",
                                                    {
                                                        "BucketName": {
                                                            "Ref": "ESBucketName"
                                                        }
                                                    }
                                                ]
                                            },
                                            {
                                                "Fn::Sub": [
                                                    "ELASTICSEARCH_S3_BUCKET_REGION=${Region}",
                                                    {
                                                        "Region": {
                                                            "Ref": "AWS::Region"
                                                        }
                                                    }
                                                ]
                                            },
                                            {
                                                "Fn::Sub": [
                                                    "ELASTICSEARCH_SNAPSHOT_IAM_ROLE=${Role}",
                                                    {
                                                        "Role": {
                                                            "Fn::GetAtt": [
                                                                "BitbucketFileServerRole",
                                                                "Arn"
                                                            ]
                                                        }
                                                    }
                                                ]
                                            },
                                            {
                                                "Fn::Sub": [
                                                    "ELASTICSEARCH_HOST=${ESEndpoint}",
                                                    {
                                                        "ESEndpoint": {
                                                            "Fn::GetAtt": [
                                                                "Elasticsearch",
                                                                "DomainEndpoint"
                                                            ]
                                                        }
                                                    }
                                                ]
                                            },
                                            {
                                                "Fn::If": [
                                                    "StandbyMode",
                                                    {
                                                        "Fn::Sub": [
                                                            "STANDBY_JDBC_URL=jdbc:postgres://${DBEndpointAddress}/bitbucket",
                                                            {
                                                                "DBEndpointAddress": {
                                                                    "Fn::GetAtt": [
                                                                        "DB",
                                                                        "Endpoint.Address"
                                                                        
                                                                    ]
                                                                }
                                                            }
                                                        ]
                                                    },
                                                    {
                                                        "Ref": "AWS::NoValue"
                                                    }
                                                ]
                                            },
                                            {
                                                "Fn::If": [
                                                    "StandbyMode",
                                                    {
                                                        "Fn::Sub": [
                                                            "DR_RDS_READ_REPLICA=${DB}",
                                                            {
                                                                "DB": {
                                                                    "Ref": "DB"
                                                                }
                                                            }
                                                        ]
                                                    },
                                                    {
                                                        "Ref": "AWS::NoValue"
                                                    }
                                                ]
                                            }
                                        ]
                                    ]
                                },
                                "mode": 420,
                                "owner": "ec2-user",
                                "group": "ec2-user"
                            }
                        },
                        "commands": {
                            "010_pull_diy_backup_repo": {
                                "command": "git pull",
                                "cwd": "/opt/atlassian/bitbucket-diy-backup",
                                "ignoreErrors": true
                            }
                        },
                        "services": {
                            "sysvinit": {
                                "cfn-hup": {
                                    "enabled": true,
                                    "ensureRunning": true,
                                    "files": [
                                        "/etc/cfn/cfn-hup.conf",
                                        "/etc/cfn/hooks.d/cfn-auto-reloader.conf"
                                    ]
                                },
                                "collectd": {
                                    "Fn::If": [
                                        "SetupCollectd",
                                        {
                                            "enabled": true,
                                            "ensureRunning": true
                                        },
                                        {
                                            "Ref": "AWS::NoValue"
                                        }
                                    ]
                                },
                                "rpcbind": {
                                    "enabled": true,
                                    "ensureRunning": true
                                }
                            }
                        }
                    },
                    "2": {
                        "services": {
                            "sysvinit": {
                                "nfs": {
                                    "enabled": true,
                                    "ensureRunning": true
                                },
                                "nfslock": {
                                    "enabled": true,
                                    "ensureRunning": true
                                }
                            }
                        },
                        "commands": {
                            "Fn::If": [
                                "RestoreFromESSnapshot",
                                {
                                    "020_restore_es_snapshot": {
                                        "command": {
                                            "Fn::Sub": [
                                                "/opt/atlassian/bitbucket-diy-backup/bitbucket.diy-restore.sh ${ESSnapshotId}",
                                                {
                                                    "ESSnapshotId": {
                                                        "Ref": "ESSnapshotId"
                                                    }
                                                }
                                            ]
                                        },
                                        "ignoreErrors": false,
                                        "env": {
                                            "SNAPSHOT_TAG_PREFIX": {
                                                "Ref": "ESSnapshotId"
                                            },
                                            "BACKUP_HOME_TYPE": "none",
                                            "BACKUP_DATABASE_TYPE": "none"
                                        }
                                    }
                                },
                                {
                                    "Ref": "AWS::NoValue"
                                }
                            ]
                        }
                    },
                    "configSets": {
                        "default": [
                            1,
                            2
                        ]
                    }
                }
            },
            "Properties": {
                "BlockDeviceMappings": [
                    {
                        "DeviceName": "/dev/sdf",
                        "Ebs": {
                            "VolumeType": {
                                "Fn::If": [
                                    "IsHomeProvisionedIops",
                                    "io1",
                                    "gp2"
                                ]
                            },
                            "Iops": {
                                "Fn::If": [
                                    "IsHomeProvisionedIops",
                                    {
                                        "Ref": "HomeIops"
                                    },
                                    {
                                        "Ref": "AWS::NoValue"
                                    }
                                ]
                            },
                            "DeleteOnTermination": {
                                "Ref": "HomeDeleteOnTermination"
                            },
                            "SnapshotId": {
                                "Fn::If": [
                                    "RestoreFromEBSSnapshot",
                                    {
                                        "Ref": "HomeVolumeSnapshotId"
                                    },
                                    {
                                        "Ref": "AWS::NoValue"
                                    }
                                ]
                            },
                            "VolumeSize": {
                                "Ref": "HomeSize"
                            }
                        }
                    },
                    {
                        "DeviceName": "/dev/xvdf",
                        "NoDevice": {}
                    }
                ],
                "IamInstanceProfile": {
                    "Ref": "BitbucketFileServerInstanceProfile"
                },
                "EbsOptimized": true,
                "ImageId": {
                    "Fn::FindInMap": [
                        "AWSRegionArch2AMI",
                        {
                            "Ref": "AWS::Region"
                        },
                        {
                            "Fn::FindInMap": [
                                "AWSInstanceType2Arch",
                                {
                                    "Ref": "FileServerInstanceType"
                                },
                                "Arch"
                            ]
                        }
                    ]
                },
                "InstanceType": {
                    "Ref": "FileServerInstanceType"
                },
                "KeyName": {
                    "Ref": "KeyName"
                },
                "NetworkInterfaces": [
                    {
                        "GroupSet": [
                            {
                                "Ref": "SecurityGroup"
                            }
                        ],
                        "AssociatePublicIpAddress": {
                            "Ref": "AssociatePublicIpAddress"
                        },
                        "DeviceIndex": 0,
                        "DeleteOnTermination": true,
                        "SubnetId": {
                            "Fn::Select": [
                                0,
                                {
                                    "Ref": "InternalSubnets"
                                }
                            ]
                        }
                    }
                ],
                "Tags": [
                    {
                        "Key": "Name",
                        "Value": "Bitbucket NFS Server"
                    },
                    {
                        "Key": "Application",
                        "Value": {
                            "Ref": "AWS::StackId"
                        }
                    }
                ],
                "UserData": {
                    "Fn::Base64": {
                        "Fn::Join": [
                            "",
                            [
                                "#!/bin/bash -xe\n",
                                "yum update -y aws-cfn-bootstrap\n",
                                {
                                    "Fn::Sub": [
                                        "/opt/aws/bin/cfn-init -v --stack ${StackName}",
                                        {
                                            "StackName": {
                                                "Ref": "AWS::StackName"
                                            }
                                        }
                                    ]
                                },
                                {
                                    "Fn::Sub": [
                                        " --resource FileServer --region ${Region}\n",
                                        {
                                            "Region": {
                                                "Ref": "AWS::Region"
                                            }
                                        }
                                    ]
                                },
                                {
                                    "Fn::Sub": [
                                        "/opt/aws/bin/cfn-signal -e $? --stack ${StackName}",
                                        {
                                            "StackName": {
                                                "Ref": "AWS::StackName"
                                            }
                                        }
                                    ]
                                },
                                {
                                    "Fn::Sub": [
                                        " --resource FileServer --region ${Region}\n",
                                        {
                                            "Region": {
                                                "Ref": "AWS::Region"
                                            }
                                        }
                                    ]
                                }
                            ]
                        ]
                    }
                }
            }
        },
        "DB": {
            "Type": "AWS::RDS::DBInstance",
            "Properties": {
                "SourceDBInstanceIdentifier": {
                    "Fn::If": [
                        "StandbyMode",
                        {
                            "Ref": "DBMaster"
                        },
                        {
                            "Ref": "AWS::NoValue"
                        }
                    ]
                },
                "DBName": {
                    "Fn::If": [
                        "RestoreRDSOrStandby",
                        {
                            "Ref": "AWS::NoValue"
                        },
                        "bitbucket"
                    ]
                },
                "AllocatedStorage": {
                    "Ref": "DBStorage"
                },
                "DBInstanceClass": {
                    "Ref": "DBInstanceClass"
                },
                "DBSnapshotIdentifier": {
                    "Fn::If": [
                        "RestoreFromRDSSnapshot",
                        {
                            "Ref": "DBSnapshotId"
                        },
                        {
                            "Ref": "AWS::NoValue"
                        }
                    ]
                },
                "DBSubnetGroupName": {
                    "Ref": "DBSubnetGroup"
                },
                "Engine": "postgres",
                "EngineVersion": "9.5.2",
                "MasterUsername": "postgres",
                "MasterUserPassword": {
                    "Fn::If": [
                        "SetDBMasterUserPassword",
                        {
                            "Ref": "DBMasterUserPassword"
                        },
                        {
                            "Ref": "AWS::NoValue"
                        }
                    ]
                },
                "StorageType": {
                    "Fn::If": [
                        "DBProvisionedIops",
                        "io1",
                        "gp2"
                    ]
                },
                "Iops": {
                    "Fn::If": [
                        "DBProvisionedIops",
                        {
                            "Ref": "DBIops"
                        },
                        {
                            "Ref": "AWS::NoValue"
                        }
                    ]
                },
                "MultiAZ": {
                    "Fn::If": [
                        "StandbyMode",
                        {
                            "Ref": "AWS::NoValue"
                        },
                        {
                            "Ref": "DBMultiAZ"
                        }
                    ]
                },
                "VPCSecurityGroups": [
                    {
                        "Ref": "SecurityGroup"
                    }
                ],
                "Tags": [
                    {
                        "Key": "Name",
                        "Value": "Bitbucket PostgreSQL Database"
                    }
                ]
            }
        },
        "DBSubnetGroup": {
            "Type": "AWS::RDS::DBSubnetGroup",
            "Properties": {
                "DBSubnetGroupDescription": "DBSubnetGroup",
                "SubnetIds": {
                    "Ref": "InternalSubnets"
                }
            }
        },
        "LoadBalancer": {
            "Type": "AWS::ElasticLoadBalancing::LoadBalancer",
            "Properties": {
                "AppCookieStickinessPolicy": [
                    {
                        "CookieName": {
                            "Fn::If": [
                                "IsVersion4X",
                                "JSESSIONID",
                                "BITBUCKETSESSIONID"
                            ]
                        },
                        "PolicyName": "SessionStickiness"
                    }
                ],
                "ConnectionDrainingPolicy": {
                    "Enabled": true,
                    "Timeout": 300
                },
                "ConnectionSettings": {
                    "IdleTimeout": 3600
                },
                "CrossZone": true,
                "Listeners": [
                    {
                        "LoadBalancerPort": 80,
                        "Protocol": "HTTP",
                        "InstancePort": {
                            "Fn::If": [
                                "SetupSSL",
                                7991,
                                7990
                            ]
                        },
                        "InstanceProtocol": "HTTP",
                        "PolicyNames": [
                            "SessionStickiness"
                        ]
                    },
                    {
                        "Fn::If": [
                            "SetupSSL",
                            {
                                "LoadBalancerPort": 443,
                                "Protocol": "HTTPS",
                                "InstancePort": 7990,
                                "InstanceProtocol": "HTTP",
                                "PolicyNames": [
                                    "SessionStickiness"
                                ],
                                "SSLCertificateId": {
                                    "Fn::Sub": [
                                        "arn:aws:iam::${AccountId}:server-certificate/${SSLCertificateName}",
                                        {
                                            "AccountId": {
                                                "Ref": "AWS::AccountId"
                                            },
                                            "SSLCertificateName": {
                                                "Ref": "SSLCertificateName"
                                            }
                                        }
                                    ]
                                }
                            },
                            {
                                "Ref": "AWS::NoValue"
                            }
                        ]
                    },
                    {
                        "LoadBalancerPort": 7999,
                        "Protocol": "TCP",
                        "InstancePort": 7999,
                        "InstanceProtocol": "TCP"
                    }
                ],
                "HealthCheck": {
                    "Target": "HTTP:7990/status",
                    "Timeout": 29,
                    "Interval": 30,
                    "UnhealthyThreshold": 2,
                    "HealthyThreshold": 2
                },
                "Scheme": "internet-facing",
                "SecurityGroups": [
                    {
                        "Ref": "SecurityGroup"
                    }
                ],
                "Subnets": {
                    "Ref": "ExternalSubnets"
                }
            }
        },
        "SecurityGroup": {
            "Type": "AWS::EC2::SecurityGroup",
            "Properties": {
                "GroupDescription": "Security group allowing SSH and HTTP/HTTPS access",
                "VpcId": {
                    "Ref": "VPC"
                },
                "SecurityGroupIngress": [
                    {
                        "IpProtocol": "tcp",
                        "FromPort": 22,
                        "ToPort": 22,
                        "CidrIp": {
                            "Ref": "CidrBlock"
                        }
                    },
                    {
                        "IpProtocol": "tcp",
                        "FromPort": 80,
                        "ToPort": 80,
                        "CidrIp": {
                            "Ref": "CidrBlock"
                        }
                    },
                    {
                        "IpProtocol": "tcp",
                        "FromPort": 443,
                        "ToPort": 443,
                        "CidrIp": {
                            "Ref": "CidrBlock"
                        }
                    },
                    {
                        "IpProtocol": "tcp",
                        "FromPort": 7999,
                        "ToPort": 7999,
                        "CidrIp": {
                            "Ref": "CidrBlock"
                        }
                    }
                ]
            }
        },
        "SecurityGroupIngress": {
            "Type": "AWS::EC2::SecurityGroupIngress",
            "Properties": {
                "GroupId": {
                    "Ref": "SecurityGroup"
                },
                "IpProtocol": "-1",
                "FromPort": "-1",
                "ToPort": "-1",
                "SourceSecurityGroupId": {
                    "Ref": "SecurityGroup"
                }
            }
        }
    },
    "Outputs": {
        "ClusterNodeGroup": {
            "Description": "The name of the auto scaling group of cluster nodes",
            "Value": {
                "Ref": "ClusterNodeGroup"
            }
        },
        "FileServer": {
            "Description": "The public DNS name of the FileServer node",
            "Value": {
                "Fn::GetAtt": [
                    "FileServer",
                    "PublicDnsName"
                ]
            }
        },
        "URL": {
            "Description": "The URL of the Bitbucket Data Center instance",
            "Value": {
                "Fn::Sub": [
                    "${HTTP}://${LoadBalancerDNSName}",
                    {
                        "HTTP": {
                            "Fn::If": [
                                "SetupSSL",
                                "https",
                                "http"
                            ]
                        },
                        "LoadBalancerDNSName": {
                            "Fn::GetAtt": [
                                "LoadBalancer",
                                "DNSName"
                            ]
                        }
                    }
                ]
            }
        },
        "DBMaster": {
            "Description": "The RDS ARN to use when creating a Data Center standby stack",
            "Value": {
                "Fn::If": [
                    "NotStandbyMode",
                    {
                        "Fn::Sub": [
                            "arn:aws:rds:${AWS::Region}:${AWS::AccountId}:db:${DB}",
                            {
                                "DB": {
                                    "Ref": "DB"
                                }
                            }
                        ]
                    },
                    {
                        "Ref": "AWS::NoValue"
                    }
                ]
            }
        }
    }
}