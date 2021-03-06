{
    "AWSTemplateFormatVersion": "2010-09-09",
    "Description": "AWS CloudFormation Template that creates the necessary Guidewire  resources.",	
	"Metadata" : {
	  "AWS::CloudFormation::Interface" : {
		"ParameterGroups" : [
		  {
			"Label" : { "default" : "Guideware Stack Network Configurations" },
			"Parameters" : [ "pGuidewireVPCCIDR","pVPNAddress","pOnPremiseCIDR","pPrivateRouteDtnCIDR","pOperatorEmail","pGuidewireS3RepoName" ]
		  },
		  {
			"Label" : { "default":"Guideware Management Stack Configurations" },
			"Parameters" : [ "pManagementSubnetCIDRAZ1","pManagementSubnetCIDRAZ2","pBastionKeyName", "pBastionInstanceType","pRDPLocation"]
		  },
		  {
			"Label" : { "default" : "Guideware WebLayer Stack Configurations" },
			"Parameters" : [ "pPrivateWebSubnetCIDRAZ1","pPrivateWebSubnetCIDRAZ2","pWebServerInstanceType","pWebServerKeyName", "pWebEBSVolumeSize", "pWebEBSIOPs"]
		  },
		  {
			"Label" : { "default" : "Guideware Application Layer Stack Configurations" },
			"Parameters" : [ "pAppServerKeyName","pAppInstanceType","pAppEBSVolumeSize", "pAppEBSIOPs","pPrivateAppSubnetCIDRAZ1","pPrivateAppSubnetCIDRAZ2" ]
		  },				  
		  {
			"Label" : { "default" : "Guideware Database Layer Stack Configurations" },
			"Parameters" : [ "pDBName","pDBUser","pDBPassword","pPrivateDBSubNetCIDRAZ1","pPrivateDBSubNetCIDRAZ2" ]
		  },
		  {
			"Label" : { "default" : "Guideware Over All Stack Configurations" },
			"Parameters" : [ "pSupportsConfig", "QSS3BucketName", "QSS3KeyPrefix" ]
		  }			  
		],
		"ParameterLabels" : {
		  "pGuidewireVPCCIDR" : { "default" : "IP Range for VPC " },
		  "pVPNAddress" : {"default" : "VPN" },
		  "pOnPremiseCIDR": {"default" : "On permise Network CidrBlock" },
		  "pPrivateRouteDtnCIDR" : {"default" : "IP Range Internal NW communication "},
		  "pOperatorEmail": {"default" : "E-Mail for technical assistance "},
  		  "pGuidewireS3RepoName":{"default":"GuidewireS3Repository"},

		  
		  
		  "pManagementSubnetCIDRAZ1" : {"default" : "Subnet CIDR for AZ1" },
		  "pManagementSubnetCIDRAZ2" : {"default" : "Subnet CIDR for AZ2" },
		  "pBastionKeyName" : {"default" : "Security Key for SSH access"  }, 
		  "pBastionInstanceType" : {"default" : "Bastion's Server type"  },
		  "pRDPLocation" : {"default" : "RDP Location" },
		  	

		  "pPrivateWebSubnetCIDRAZ1": {"default" : "Subnet CIDR for AZ1" },
		  "pPrivateWebSubnetCIDRAZ2": {"default" : "Subnet CIDR for AZ2" },
		  "pWebServerInstanceType": {"default" : "Server type" },
		  "pWebServerKeyName": {"default" : "Security Key for SSH access" }, 
		  "pWebEBSVolumeSize": {"default" : "Volume Size" }, 
		  "pWebEBSIOPs": {"default" : "IOPS" },

		  
		  "pPrivateAppSubnetCIDRAZ1": {"default" : "Subnet CIDR for AZ1" },
		  "pPrivateAppSubnetCIDRAZ2": {"default" : "Subnet CIDR for AZ2" },
		  "pAppServerKeyName": {"default" : "Security Key for SSH access" },
		  "pAppInstanceType": {"default" : "Server type" },
		  "pAppEBSVolumeSize": {"default" : "Volume Size" }, 
		  "pAppEBSIOPs": {"default" : "IOPS" },
		  
		  "pDBName": {"default" : "DatabaseName" },
		  "pDBUser": {"default" : "DB User" },
		  "pDBPassword": {"default" : "Password " },
		  "pPrivateDBSubNetCIDRAZ1": {"default" : "Subnet CIDR for AZ1" },
		  "pPrivateDBSubNetCIDRAZ2": {"default" : "Subnet CIDR for AZ2" },
		  
		   "pSupportsConfig": {"default" : "Configuratioin Support" }, 
		   "QSS3BucketName": {"default" : "QuickStart S3 Bucket Name" }, 
		   "QSS3KeyPrefix": {"default" : "QuickStart S3 Folder Name" }
		}
	  }
	},

    "Mappings": {
        "AWSInfoRegionMap": {
            "us-east-1": {
                "QuickStartS3URL": "https://s3.amazonaws.com"
            }
        },
        "RegionServiceSupport": {
            "us-east-1": {
                "ConfigRules": "true"
            },
            "ap-northeast-1": {
                "ConfigRules": "false"
            }
        }
    },
    "Parameters": {
        "pRDPLocation": {
            "Description": "Lockdown RDP access to the bastion host (default can be accessed from anywhere)",
            "Type": "String",
            "MinLength": "9",
            "MaxLength": "19",
            "Default": "0.0.0.0/0",
            "AllowedPattern": "(\\d{1,3})\\.(\\d{1,3})\\.(\\d{1,3})\\.(\\d{1,3})/(\\d{1,2})",
            "ConstraintDescription": "must be a valid CIDR range of the form x.x.x.x/x."
        },
		"pGuidewireS3RepoName":{
			"Description": "GuidewireS3Repo for documentation",
				"Type": "String",
				"Default": "GuidewireS3Repository"
		},
        "pWebServerInstanceType": {
            "Description": "WebServer Server EC2 instance type",
            "Type": "String",
            "Default": "t2.micro"
        },
        "pWebServerKeyName": {
            "Description": "The SSH key pair in your account to use for all other WebServer instance logins",
            "Type": "AWS::EC2::KeyPair::KeyName",
            "Default": "awscoe",
            "ConstraintDescription": "must be the name of an existing EC2 KeyPair."
        },
        "pWebEBSVolumeSize": {
            "Description": "Size in GiB of the WebEBS volume if attached",
            "Type": "Number",
            "Default": "100",
            "MinValue": "1",
            "MaxValue": "1000"
        },
        "pWebEBSIOPs": {
            "Description": "Provisioned IOPs for WebEBS volume if supported by the instance type",
            "Type": "Number",
            "Default": "100",
            "MinValue": "1",
            "MaxValue": "30000"
        },
        "pVPNAddress": {
            "Type": "String",
            "Description": "IP Address of your VPN device",
            "MinLength": "7",
            "MaxLength": "15",
            "Default": "172.0.1.255",
            "AllowedPattern": "(\\d{1,3})\\.(\\d{1,3})\\.(\\d{1,3})\\.(\\d{1,3})",
            "ConstraintDescription": "must be a valid IP address of the form x.x.x.x"
        },
        "pOnPremiseCIDR": {
            "Type": "String",
            "Description": "IP Address range for your existing infrastructure",
            "MinLength": "9",
            "MaxLength": "19",
            "Default": "10.0.0.0/16",
            "AllowedPattern": "(\\d{1,3})\\.(\\d{1,3})\\.(\\d{1,3})\\.(\\d{1,3})/(\\d{1,2})",
            "ConstraintDescription": "must be a valid IP CIDR range of the form x.x.x.x/x."
        },
        "pDBName": {
            "Default": "SampleGuidewareDatabase",
            "Description": "The database name",
            "Type": "String",
            "MinLength": "1",
            "MaxLength": "64",
            "AllowedPattern": "[a-zA-Z][a-zA-Z0-9]*",
            "ConstraintDescription": "Must be 1 to 64 alphanumeric characters.must begin with a letter and contain only alphanumeric characters."
        },
        "pDBUser": {
            "Default": "admin",
            "NoEcho": "true",
            "Description": "The database admin account username",
            "Type": "String",
            "MinLength": "1",
            "MaxLength": "16",
            "AllowedPattern": "[a-zA-Z][a-zA-Z0-9]*",
            "ConstraintDescription": "Must be 1 to 16 alphanumeric characters.First character must be a letter.Cannot be a reserved word for the chosen database engine."
        },
        "pDBPassword": {
            "NoEcho": "true",
            "Description": "Mixed alphanumeric and must be between 8 and 28 characters and contain at least one capital letter",
            "Type": "String",
            "MinLength": "8",
            "MaxLength": "28",
            "Default": "admin123",
            "AllowedPattern": "[a-zA-Z][a-zA-Z0-9]*",
            "ConstraintDescription": "Can only contain alphanumeric characters or the following special characters !^*-_+, between 8 and 28 characters."
        },
        "pAppServerKeyName": {
            "Description": "The SSH key pair in your account to use for all other Application instance logins",
            "Type": "AWS::EC2::KeyPair::KeyName",
            "Default": "awscoe",
            "ConstraintDescription": "must be the name of an existing EC2 KeyPair."
        },
        "pAppInstanceType": {
            "Description": "Application Server EC2 instance type",
            "Type": "String",
            "Default": "t2.micro"
        },
        "pAppEBSVolumeSize": {
            "Description": "Size in GiB of the App EBS volume if attached",
            "Type": "Number",
            "Default": "100",
            "MinValue": "1",
            "MaxValue": "1000"
        },
        "pAppEBSIOPs": {
            "Description": "Provisioned IOPs for EBS volume if supported by the instance type",
            "Type": "Number",
            "Default": "100",
            "MinValue": "1",
            "MaxValue": "30000"
        },
        "pBastionKeyName": {
            "Description": "The SSH key pair in your account to use for the bastion host login",
            "Type": "AWS::EC2::KeyPair::KeyName",
            "Default": "awscoe",
            "ConstraintDescription": "must be the name of an existing EC2 KeyPair."
        },
        "pBastionInstanceType": {
            "Description": "WebServer Server EC2 instance type",
            "Type": "String",
            "Default": "t2.micro"
        },
        "pGuidewireVPCCIDR": {
            "Type": "String",
            "Default": "172.0.0.0/16",
            "Description": "The VPC CidrBlock"
        },
        "pManagementSubnetCIDRAZ1": {
            "Type": "String",
            "Default": "172.0.0.0/24",
            "Description": "The Public SUBnet CidrBlock for NAT in AZ1"
        },
        "pPrivateWebSubnetCIDRAZ1": {
            "Type": "String",
            "Default": "172.0.1.0/24",
            "Description": "The Private SUBnet CidrBlock for Web in AZ1"
        },
        "pPrivateAppSubnetCIDRAZ1": {
            "Type": "String",
            "Default": "172.0.2.0/24",
            "Description": "The Private SubNet CidrBlock for APP in AZ1"
        },
        "pPrivateDBSubNetCIDRAZ1": {
            "Type": "String",
            "Default": "172.0.3.0/24",
            "Description": "The Private SubNet CidrBlock for DB in AZ1"
        },
        "pManagementSubnetCIDRAZ2": {
            "Type": "String",
            "Default": "172.0.4.0/24",
            "Description": "The Public SUBnet CidrBlock for NAT in AZ2"
        },
        "pPrivateWebSubnetCIDRAZ2": {
            "Type": "String",
            "Default": "172.0.5.0/24",
            "Description": "The Private SUBnet CidrBlock for Web in AZ2"
        },
        "pPrivateAppSubnetCIDRAZ2": {
            "Type": "String",
            "Default": "172.0.6.0/24",
            "Description": "The Private SubNet CidrBlock for APP in AZ2"
        },
        "pPrivateRouteDtnCIDR": {
            "Type": "String",
            "Default": "192.0.0.0/16"
        },
        "pPrivateDBSubNetCIDRAZ2": {
            "Type": "String",
            "Default": "172.0.7.0/24",
            "Description": "The Private SubNet CidrBlock for DB in AZ2"
        },
        "pSSLCertificateArn": {
            "Type": "String",
            "Default": "arn:aws:iam::932833910912:server-certificate/TEST-CERT",
            "Description": "The default SSL Certificate should be available in AWS account."
        },
        "GuidewareKMSUser": {
            "Type": "String",
            "Default": "arn:aws:iam::932833910912:user/Prasad.KGV@cognizant.com",
            "Description": "The default User ARN available in AWS account for KMS encryption."
        },
        "pOperatorEmail": {
            "Default": "nobody@somewhere.com",
            "Description": "EMail address to notify if there are any operational issues",
            "Type": "String"
        },
        "pSupportsConfig": {
            "Type": "String",
            "AllowedValues": [
                "Yes",
                "No"
            ],
            "Default": "No",
            "Description": "Is AWS Config Rules already configured for this region? Use ''No'' if you are uncertain. AWS Config Rules is available in these regions: US East(Virginia), US West (Oregon), EU West (Ireland), and EU Central (Frankfurt).See AWS Config Management Console or Deployment Guide for details."
        },
        "QSS3BucketName": {
            "Type": "String",
            "AllowedPattern": "^[0-9a-zA-Z]+([0-9a-zA-Z-.]*[0-9a-zA-Z])*$",
            "Default": "cfntemplates-coe",
            "Description": "S3 bucket name for the Quick Start assets. Quick Start bucket name can include numbers, lowercase letters, uppercase letters, and hyphens (-).It cannot start or end with a hyphen (-).",
            "ConstraintDescription": "Quick Start bucket name can include numbers, lowercase letters, uppercase letters, periods (.), and hyphens (-). It cannot start or end with a hyphen (-)."
        },
        "QSS3KeyPrefix": {
            "Type": "String",
            "AllowedPattern": "^[0-9a-zA-Z-]+(/[0-9a-zA-Z-]+)*$",
            "Default": "Guideware",
            "Description": "S3 key prefix for the Quick Start assets. Quick Start key prefix can include numbers, lowercase letters, uppercase letters, hyphens (-), and forward slash (/). It cannot start or end with forward slash (/) because they are automatically appended.",
            "ConstraintDescription": "Quick Start key prefix can include numbers, lowercase letters, uppercase letters, hyphens (-), and forward slash (/). It cannot start or end with forward slash (/) because they are automatically appended."
        }
    },
    "Resources": {
        "rVPC": {
            "Type": "AWS::EC2::VPC",
            "Properties": {
                "CidrBlock": {
                    "Ref": "pGuidewireVPCCIDR"
                },
                "EnableDnsSupport": "true",
                "EnableDnsHostnames": "true",
                "Tags": [
                    {
                        "Key": "Name",
                        "Value": "Guideware-VPC"
                    },
                    {
                        "Key": "Application",
                        "Value": {
                            "Ref": "AWS::StackId"
                        }
                    },
                    {
                        "Key": "Network",
                        "Value": "Public"
                    }
                ]
            },
            "Metadata": {
                "AWS::CloudFormation::Designer": {
                    "id": "cc74d66d-558a-4c5b-bc0b-963b1b845dcd"
                }
            }
        },
        "InternetGateway": {
            "Type": "AWS::EC2::InternetGateway",
            "Properties": {
                "Tags": [
                    {
                        "Key": "Name",
                        "Value": "Guideware-InternetGateway"
                    },
                    {
                        "Key": "Application",
                        "Value": {
                            "Ref": "AWS::StackId"
                        }
                    },
                    {
                        "Key": "Network",
                        "Value": "Public"
                    }
                ]
            },
            "Metadata": {
                "AWS::CloudFormation::Designer": {
                    "id": "55f71046-7979-4f7d-9aeb-42d91b3921fb"
                }
            }
        },
        "rMyRoute": {
            "Type": "AWS::EC2::Route",
            "Properties": {
                "RouteTableId": {
                    "Ref": "rPublicRouteTable"
                },
                "DestinationCidrBlock": "0.0.0.0/0",
                "GatewayId": {
                    "Ref": "InternetGateway"
                }
            },
            "Metadata": {
                "AWS::CloudFormation::Designer": {
                    "id": "a26d6d51-ab21-4c09-a5b1-c727936aae62"
                }
            }
        },
        "GatewayToInternet": {
            "Type": "AWS::EC2::VPCGatewayAttachment",
            "Properties": {
                "VpcId": {
                    "Ref": "rVPC"
                },
                "InternetGatewayId": {
                    "Ref": "InternetGateway"
                }
            },
            "Metadata": {
                "AWS::CloudFormation::Designer": {
                    "id": "08999143-e436-4399-a066-256c50af1b04"
                }
            }
        },
        "rPrivateDBSubnetAZ1": {
            "Type": "AWS::EC2::Subnet",
            "Properties": {
                "VpcId": {
                    "Ref": "rVPC"
                },
                "CidrBlock": {
                    "Ref": "pPrivateDBSubNetCIDRAZ1"
                },
                "AvailabilityZone": "us-east-1a",
                "Tags": [
                    {
                        "Key": "Name",
                        "Value": "Guideware-PrivateDBSubnetAZ1"
                    },
                    {
                        "Key": "Database",
                        "Value": {
                            "Ref": "AWS::StackId"
                        }
                    },
                    {
                        "Key": "Network",
                        "Value": "Private"
                    }
                ]
            },
            "Metadata": {
                "AWS::CloudFormation::Designer": {
                    "id": "38889972-bc47-4f0c-a53e-3c7a94dc4592"
                }
            }
        },
        "rPrivateDBSubnetAZ2": {
            "Type": "AWS::EC2::Subnet",
            "Properties": {
                "VpcId": {
                    "Ref": "rVPC"
                },
                "CidrBlock": {
                    "Ref": "pPrivateDBSubNetCIDRAZ2"
                },
                "AvailabilityZone": "us-east-1e",
                "Tags": [
                    {
                        "Key": "Name",
                        "Value": "Guideware-PrivateDBSubnetAZ2"
                    },
                    {
                        "Key": "Database",
                        "Value": {
                            "Ref": "AWS::StackId"
                        }
                    },
                    {
                        "Key": "Network",
                        "Value": "Private"
                    }
                ]
            },
            "Metadata": {
                "AWS::CloudFormation::Designer": {
                    "id": "10231204-86c0-49a1-beb7-ed948140e170"
                }
            }
        },
        "rManagementSubnetAZ1": {
            "Type": "AWS::EC2::Subnet",
            "Properties": {
                "VpcId": {
                    "Ref": "rVPC"
                },
                "AvailabilityZone": "us-east-1a",
                "CidrBlock": {
                    "Ref": "pManagementSubnetCIDRAZ1"
                },
                "Tags": [
                    {
                        "Key": "Name",
                        "Value": "Guideware-PublicSubnetAZ1"
                    },
                    {
                        "Key": "Application",
                        "Value": {
                            "Ref": "AWS::StackId"
                        }
                    },
                    {
                        "Key": "Network",
                        "Value": "Public"
                    }
                ]
            },
            "Metadata": {
                "AWS::CloudFormation::Designer": {
                    "id": "5120d8aa-085f-486d-aa46-4658d5a0fe99"
                }
            }
        },
        "rManagementSubnetAZ2": {
            "Type": "AWS::EC2::Subnet",
            "Properties": {
                "VpcId": {
                    "Ref": "rVPC"
                },
                "AvailabilityZone": "us-east-1e",
                "CidrBlock": {
                    "Ref": "pManagementSubnetCIDRAZ2"
                },
                "Tags": [
                    {
                        "Key": "Name",
                        "Value": "Guideware-PublicSubnetAZ2"
                    },
                    {
                        "Key": "Application",
                        "Value": {
                            "Ref": "AWS::StackId"
                        }
                    },
                    {
                        "Key": "Network",
                        "Value": "Public"
                    }
                ]
            },
            "Metadata": {
                "AWS::CloudFormation::Designer": {
                    "id": "d1a4544e-25ad-475a-b61b-5b503f5da86d"
                }
            }
        },
        "rPublicRouteTable": {
            "Type": "AWS::EC2::RouteTable",
            "Properties": {
                "VpcId": {
                    "Ref": "rVPC"
                },
                "Tags": [
                    {
                        "Key": "Name",
                        "Value": "Guideware-PublicRouteTable"
                    },
                    {
                        "Key": "Application",
                        "Value": {
                            "Ref": "AWS::StackId"
                        }
                    },
                    {
                        "Key": "Network",
                        "Value": "Public"
                    }
                ]
            },
            "Metadata": {
                "AWS::CloudFormation::Designer": {
                    "id": "18503f37-e3c6-43f9-8268-7bd4ba0a7b71"
                }
            }
        },
        "rManagementSubnetRouteTableAssociationAZ1": {
            "Properties": {
                "RouteTableId": {
                    "Ref": "rPublicRouteTable"
                },
                "SubnetId": {
                    "Ref": "rManagementSubnetAZ1"
                }
            },
            "Type": "AWS::EC2::SubnetRouteTableAssociation",
            "Metadata": {
                "AWS::CloudFormation::Designer": {
                    "id": "c4ff394d-65bc-46ee-972a-63ec9f817db4"
                }
            }
        },
        "rManagementSubnetRouteTableAssociationAZ2": {
            "Properties": {
                "RouteTableId": {
                    "Ref": "rPublicRouteTable"
                },
                "SubnetId": {
                    "Ref": "rManagementSubnetAZ2"
                }
            },
            "Type": "AWS::EC2::SubnetRouteTableAssociation",
            "Metadata": {
                "AWS::CloudFormation::Designer": {
                    "id": "dfbcf14b-f1d0-4d6f-986b-cbd10916137e"
                }
            }
        },
        "rPublicNetworkAcl": {
            "Type": "AWS::EC2::NetworkAcl",
            "Properties": {
                "VpcId": {
                    "Ref": "rVPC"
                },
                "Tags": [
                    {
                        "Key": "Name",
                        "Value": "Guideware-PublicNetworkAcl"
                    },
                    {
                        "Key": "Application",
                        "Value": {
                            "Ref": "AWS::StackId"
                        }
                    },
                    {
                        "Key": "Network",
                        "Value": "Public"
                    }
                ]
            },
            "Metadata": {
                "AWS::CloudFormation::Designer": {
                    "id": "6c27d479-a6a0-4cfe-b324-24ed479ae900"
                }
            }
        },
        "rInboundHTTPPublicNetworkAclEntry": {
            "Type": "AWS::EC2::NetworkAclEntry",
            "Properties": {
                "NetworkAclId": {
                    "Ref": "rPublicNetworkAcl"
                },
                "RuleNumber": "100",
                "Protocol": "6",
                "RuleAction": "allow",
                "Egress": "false",
                "CidrBlock": "0.0.0.0/0",
                "PortRange": {
                    "From": "80",
                    "To": "80"
                }
            },
            "Metadata": {
                "AWS::CloudFormation::Designer": {
                    "id": "6bcfccad-a9f5-4f49-b13a-fdeabb625020"
                }
            }
        },
        "rInboundDynamicPortPublicNetworkAclEntry": {
            "Type": "AWS::EC2::NetworkAclEntry",
            "Properties": {
                "NetworkAclId": {
                    "Ref": "rPublicNetworkAcl"
                },
                "RuleNumber": "101",
                "Protocol": "6",
                "RuleAction": "allow",
                "Egress": "false",
                "CidrBlock": "0.0.0.0/0",
                "PortRange": {
                    "From": "0",
                    "To": "65535"
                }
            },
            "Metadata": {
                "AWS::CloudFormation::Designer": {
                    "id": "1047eb91-4a72-4df7-868c-9d96c63913fd"
                }
            }
        },
        "rInboundSSHPublicNetworkAclEntry": {
            "Type": "AWS::EC2::NetworkAclEntry",
            "Properties": {
                "NetworkAclId": {
                    "Ref": "rPublicNetworkAcl"
                },
                "RuleNumber": "102",
                "Protocol": "6",
                "RuleAction": "allow",
                "Egress": "false",
                "CidrBlock": "0.0.0.0/0",
                "PortRange": {
                    "From": "22",
                    "To": "22"
                }
            },
            "Metadata": {
                "AWS::CloudFormation::Designer": {
                    "id": "ec05861c-3a5c-48cd-bfe8-d1a56ea1c8b4"
                }
            }
        },
        "rOutboundPublicNetworkAclEntry": {
            "Type": "AWS::EC2::NetworkAclEntry",
            "Properties": {
                "NetworkAclId": {
                    "Ref": "rPublicNetworkAcl"
                },
                "RuleNumber": "100",
                "Protocol": "6",
                "RuleAction": "allow",
                "Egress": "true",
                "CidrBlock": "0.0.0.0/0",
                "PortRange": {
                    "From": "0",
                    "To": "65535"
                }
            },
            "Metadata": {
                "AWS::CloudFormation::Designer": {
                    "id": "f0d381ce-5641-4540-88b4-25c225ab26dc"
                }
            }
        },
        "rManagementSubnetNetworkAclAssociationAZ1": {
            "Type": "AWS::EC2::SubnetNetworkAclAssociation",
            "Properties": {
                "SubnetId": {
                    "Ref": "rManagementSubnetAZ1"
                },
                "NetworkAclId": {
                    "Ref": "rPublicNetworkAcl"
                }
            },
            "Metadata": {
                "AWS::CloudFormation::Designer": {
                    "id": "bde377a3-60b7-4030-ab89-a35a51a7f8e1"
                }
            }
        },
        "rManagementSubnetNetworkAclAssociationAZ2": {
            "Type": "AWS::EC2::SubnetNetworkAclAssociation",
            "Properties": {
                "SubnetId": {
                    "Ref": "rManagementSubnetAZ2"
                },
                "NetworkAclId": {
                    "Ref": "rPublicNetworkAcl"
                }
            },
            "Metadata": {
                "AWS::CloudFormation::Designer": {
                    "id": "5046a03a-347d-4faf-9ea4-a372000c9a17"
                }
            }
        },
        "rPrivateAppSubnetAZ1": {
            "Type": "AWS::EC2::Subnet",
            "Properties": {
                "VpcId": {
                    "Ref": "rVPC"
                },
                "AvailabilityZone": "us-east-1a",
                "CidrBlock": {
                    "Ref": "pPrivateAppSubnetCIDRAZ1"
                },
                "Tags": [
                    {
                        "Key": "Name",
                        "Value": "Guideware-PrivateAppSubnetAZ1"
                    },
                    {
                        "Key": "Application",
                        "Value": {
                            "Ref": "AWS::StackId"
                        }
                    },
                    {
                        "Key": "Network",
                        "Value": "Private"
                    }
                ]
            },
            "Metadata": {
                "AWS::CloudFormation::Designer": {
                    "id": "69d66f41-7d94-498d-a47b-703eaeb8c79e"
                }
            }
        },
        "rPrivateAppSubnetAZ2": {
            "Type": "AWS::EC2::Subnet",
            "Properties": {
                "VpcId": {
                    "Ref": "rVPC"
                },
                "AvailabilityZone": "us-east-1e",
                "CidrBlock": {
                    "Ref": "pPrivateAppSubnetCIDRAZ2"
                },
                "Tags": [
                    {
                        "Key": "Name",
                        "Value": "Guideware-PrivateAppSubnetAZ2"
                    },
                    {
                        "Key": "Application",
                        "Value": {
                            "Ref": "AWS::StackId"
                        }
                    },
                    {
                        "Key": "Network",
                        "Value": "Private"
                    }
                ]
            },
            "Metadata": {
                "AWS::CloudFormation::Designer": {
                    "id": "97fa1ea3-c811-49b8-b507-bd5c88866213"
                }
            }
        },
        "rPrivateWebSubnetAZ1": {
            "Type": "AWS::EC2::Subnet",
            "Properties": {
                "VpcId": {
                    "Ref": "rVPC"
                },
                "AvailabilityZone": "us-east-1a",
                "CidrBlock": {
                    "Ref": "pPrivateWebSubnetCIDRAZ1"
                },
                "Tags": [
                    {
                        "Key": "Name",
                        "Value": "Guideware-PrivateWebSubnetAZ1"
                    },
                    {
                        "Key": "Application",
                        "Value": {
                            "Ref": "AWS::StackId"
                        }
                    },
                    {
                        "Key": "Network",
                        "Value": "Private"
                    }
                ]
            },
            "Metadata": {
                "AWS::CloudFormation::Designer": {
                    "id": "b95c0b8c-571c-459b-ae13-f8a33890bd60"
                }
            }
        },
        "rPrivateWebSubnetAZ2": {
            "Type": "AWS::EC2::Subnet",
            "Properties": {
                "VpcId": {
                    "Ref": "rVPC"
                },
                "AvailabilityZone": "us-east-1e",
                "CidrBlock": {
                    "Ref": "pPrivateWebSubnetCIDRAZ2"
                },
                "Tags": [
                    {
                        "Key": "Name",
                        "Value": "Guideware-PrivateWebSubnetAZ2"
                    },
                    {
                        "Key": "Application",
                        "Value": {
                            "Ref": "AWS::StackId"
                        }
                    },
                    {
                        "Key": "Network",
                        "Value": "Private"
                    }
                ]
            },
            "Metadata": {
                "AWS::CloudFormation::Designer": {
                    "id": "765e5873-f7b9-48e0-b8e2-78f80af80c69"
                }
            }
        },
        "rVPNGateway": {
            "Type": "AWS::EC2::VPNGateway",
            "Properties": {
                "Type": "ipsec.1",
                "Tags": [
                    {
                        "Key": "Name",
                        "Value": "Guideware-VPNGateway"
                    },
                    {
                        "Key": "Application",
                        "Value": {
                            "Ref": "AWS::StackName"
                        }
                    }
                ]
            },
            "Metadata": {
                "AWS::CloudFormation::Designer": {
                    "id": "5ab87b09-a619-46cf-8934-533d117a0fb1"
                }
            }
        },
        "rVPNGatewayAttachment": {
            "Type": "AWS::EC2::VPCGatewayAttachment",
            "Properties": {
                "VpcId": {
                    "Ref": "rVPC"
                },
                "VpnGatewayId": {
                    "Ref": "rVPNGateway"
                }
            },
            "Metadata": {
                "AWS::CloudFormation::Designer": {
                    "id": "845631d0-1076-4893-8fea-b82eb09fe86f"
                }
            }
        },
        "rCustomerGateway": {
            "Type": "AWS::EC2::CustomerGateway",
            "Properties": {
                "Type": "ipsec.1",
                "BgpAsn": "65000",
                "IpAddress": {
                    "Ref": "pVPNAddress"
                },
                "Tags": [
                    {
                        "Key": "Name",
                        "Value": "Guideware-CustomerGateway"
                    },
                    {
                        "Key": "Application",
                        "Value": {
                            "Ref": "AWS::StackName"
                        }
                    },
                    {
                        "Key": "VPN",
                        "Value": {
                            "Fn::Join": [
                                "",
                                [
                                    "Gateway to ",
                                    {
                                        "Ref": "pVPNAddress"
                                    }
                                ]
                            ]
                        }
                    }
                ]
            },
            "Metadata": {
                "AWS::CloudFormation::Designer": {
                    "id": "343c4b60-8570-4028-995c-e15a45b83c04"
                }
            }
        },
        "rVPNConnection": {
            "Type": "AWS::EC2::VPNConnection",
            "Properties": {
                "Type": "ipsec.1",
                "StaticRoutesOnly": "true",
                "CustomerGatewayId": {
                    "Ref": "rCustomerGateway"
                },
                "VpnGatewayId": {
                    "Ref": "rVPNGateway"
                },
                "Tags": [
                    {
                        "Key": "Name",
                        "Value": "Guideware-VPNConnection"
                    }
                ]
            },
            "Metadata": {
                "AWS::CloudFormation::Designer": {
                    "id": "37b279d5-23fe-4257-a398-9fd164aa2c08"
                }
            }
        },
        "rVPNConnectionRoute": {
            "Type": "AWS::EC2::VPNConnectionRoute",
            "Properties": {
                "VpnConnectionId": {
                    "Ref": "rVPNConnection"
                },
                "DestinationCidrBlock": {
                    "Ref": "pOnPremiseCIDR"
                }
            },
            "Metadata": {
                "AWS::CloudFormation::Designer": {
                    "id": "3417b4ac-11ce-4721-b2e6-a0dd23075e4f"
                }
            }
        },
        "rPrivateRouteTable": {
            "Type": "AWS::EC2::RouteTable",
            "Properties": {
                "VpcId": {
                    "Ref": "rVPC"
                },
                "Tags": [
                    {
                        "Key": "Name",
                        "Value": "Guideware-PrivateRouteTable"
                    },
                    {
                        "Key": "Application",
                        "Value": {
                            "Ref": "AWS::StackName"
                        }
                    },
                    {
                        "Key": "Network",
                        "Value": "VPN Connected Subnet"
                    }
                ]
            },
            "Metadata": {
                "AWS::CloudFormation::Designer": {
                    "id": "c4450a3f-2d14-4786-a414-2b67ed80b268"
                }
            }
        },
        "rPrivateAppSubnetRouteTableAssociationAZ1": {
            "Type": "AWS::EC2::SubnetRouteTableAssociation",
            "Properties": {
                "SubnetId": {
                    "Ref": "rPrivateAppSubnetAZ1"
                },
                "RouteTableId": {
                    "Ref": "rPrivateRouteTable"
                }
            },
            "Metadata": {
                "AWS::CloudFormation::Designer": {
                    "id": "bd414290-2000-400d-9044-7bd090cdcf06"
                }
            }
        },
        "rPrivateAppSubnetRouteTableAssociationAZ2": {
            "Type": "AWS::EC2::SubnetRouteTableAssociation",
            "Properties": {
                "SubnetId": {
                    "Ref": "rPrivateAppSubnetAZ2"
                },
                "RouteTableId": {
                    "Ref": "rPrivateRouteTable"
                }
            },
            "Metadata": {
                "AWS::CloudFormation::Designer": {
                    "id": "e9258c20-ee8e-4126-a535-a9bf0bba2049"
                }
            }
        },
        "rPrivateWebSubnetRouteTableAssociationAZ1": {
            "Type": "AWS::EC2::SubnetRouteTableAssociation",
            "Properties": {
                "SubnetId": {
                    "Ref": "rPrivateWebSubnetAZ1"
                },
                "RouteTableId": {
                    "Ref": "rPrivateRouteTable"
                }
            },
            "Metadata": {
                "AWS::CloudFormation::Designer": {
                    "id": "4aadcf07-52f3-462b-9178-7cac2f6c02b2"
                }
            }
        },
        "rPrivateWebSubnetRouteTableAssociationAZ2": {
            "Type": "AWS::EC2::SubnetRouteTableAssociation",
            "Properties": {
                "SubnetId": {
                    "Ref": "rPrivateWebSubnetAZ2"
                },
                "RouteTableId": {
                    "Ref": "rPrivateRouteTable"
                }
            },
            "Metadata": {
                "AWS::CloudFormation::Designer": {
                    "id": "d1144ffb-8741-47ca-9fb2-bdb6a8e73ac3"
                }
            }
        },
        "rPrivateDBSubnetRouteTableAssociationAZ1": {
            "Type": "AWS::EC2::SubnetRouteTableAssociation",
            "Properties": {
                "SubnetId": {
                    "Ref": "rPrivateDBSubnetAZ1"
                },
                "RouteTableId": {
                    "Ref": "rPrivateRouteTable"
                }
            },
            "Metadata": {
                "AWS::CloudFormation::Designer": {
                    "id": "ae7591e7-201a-4fa4-bc9e-134a903be7b7"
                }
            }
        },
        "rPrivateDBSubnetRouteTableAssociationAZ2": {
            "Type": "AWS::EC2::SubnetRouteTableAssociation",
            "Properties": {
                "SubnetId": {
                    "Ref": "rPrivateDBSubnetAZ2"
                },
                "RouteTableId": {
                    "Ref": "rPrivateRouteTable"
                }
            },
            "Metadata": {
                "AWS::CloudFormation::Designer": {
                    "id": "93a3a9ba-de85-4cb4-9f9f-2bfdc6d11420"
                }
            }
        },
        "rPrivateRouteAZ1": {
            "Type": "AWS::EC2::Route",
            "DependsOn": "rVPNGatewayAttachment",
            "Properties": {
                "RouteTableId": {
                    "Ref": "rPrivateRouteTable"
                },
                "DestinationCidrBlock": {
                    "Ref": "pPrivateRouteDtnCIDR"
                },
                "NatGatewayId": {
                    "Ref": "rAPPNATGatewayAZ1"
                }
            },
            "Metadata": {
                "AWS::CloudFormation::Designer": {
                    "id": "38091ba6-55d9-47a2-982e-c66d496b2b90"
                }
            }
        },
        "rPrivateNetworkAcl": {
            "Type": "AWS::EC2::NetworkAcl",
            "Properties": {
                "VpcId": {
                    "Ref": "rVPC"
                },
                "Tags": [
                    {
                        "Key": "Name",
                        "Value": "Guideware-PrivateNetworkAcl"
                    },
                    {
                        "Key": "Application",
                        "Value": {
                            "Ref": "AWS::StackName"
                        }
                    },
                    {
                        "Key": "Network",
                        "Value": "Private"
                    }
                ]
            },
            "Metadata": {
                "AWS::CloudFormation::Designer": {
                    "id": "2e834c5e-df8c-443b-903c-b528260b32eb"
                }
            }
        },
        "rInboundPrivateNetworkAclEntry": {
            "Type": "AWS::EC2::NetworkAclEntry",
            "Properties": {
                "NetworkAclId": {
                    "Ref": "rPrivateNetworkAcl"
                },
                "RuleNumber": "100",
                "Protocol": "6",
                "RuleAction": "allow",
                "Egress": "false",
                "CidrBlock": "0.0.0.0/0",
                "PortRange": {
                    "From": "0",
                    "To": "65535"
                }
            },
            "Metadata": {
                "AWS::CloudFormation::Designer": {
                    "id": "57c7aeed-d178-461f-b2a8-63c640af1431"
                }
            }
        },
        "rOutBoundPrivateNetworkAclEntry": {
            "Type": "AWS::EC2::NetworkAclEntry",
            "Properties": {
                "NetworkAclId": {
                    "Ref": "rPrivateNetworkAcl"
                },
                "RuleNumber": "100",
                "Protocol": "6",
                "RuleAction": "allow",
                "Egress": "true",
                "CidrBlock": "0.0.0.0/0",
                "PortRange": {
                    "From": "0",
                    "To": "65535"
                }
            },
            "Metadata": {
                "AWS::CloudFormation::Designer": {
                    "id": "3ac6a853-4804-4cde-89ba-65552a7e4844"
                }
            }
        },
        "rPrivateAppSubnetNetworkAclAssociationAZ1": {
            "Type": "AWS::EC2::SubnetNetworkAclAssociation",
            "Properties": {
                "SubnetId": {
                    "Ref": "rPrivateAppSubnetAZ1"
                },
                "NetworkAclId": {
                    "Ref": "rPrivateNetworkAcl"
                }
            },
            "Metadata": {
                "AWS::CloudFormation::Designer": {
                    "id": "1f3fa8de-2929-40fb-a4b4-ec9841ad80ed"
                }
            }
        },
        "rPrivateAppSubnetNetworkAclAssociationAZ2": {
            "Type": "AWS::EC2::SubnetNetworkAclAssociation",
            "Properties": {
                "SubnetId": {
                    "Ref": "rPrivateAppSubnetAZ2"
                },
                "NetworkAclId": {
                    "Ref": "rPrivateNetworkAcl"
                }
            },
            "Metadata": {
                "AWS::CloudFormation::Designer": {
                    "id": "e31d4d24-ca5c-46a3-949f-d67d5b6c59f0"
                }
            }
        },
        "rPrivateWebSubnetNetworkAclAssociationAZ1": {
            "Type": "AWS::EC2::SubnetNetworkAclAssociation",
            "Properties": {
                "SubnetId": {
                    "Ref": "rPrivateWebSubnetAZ1"
                },
                "NetworkAclId": {
                    "Ref": "rPrivateNetworkAcl"
                }
            },
            "Metadata": {
                "AWS::CloudFormation::Designer": {
                    "id": "112bab77-6c3f-4c33-a5ff-60f8a9344929"
                }
            }
        },
        "rPrivateWebSubnetNetworkAclAssociationAZ2": {
            "Type": "AWS::EC2::SubnetNetworkAclAssociation",
            "Properties": {
                "SubnetId": {
                    "Ref": "rPrivateWebSubnetAZ2"
                },
                "NetworkAclId": {
                    "Ref": "rPrivateNetworkAcl"
                }
            },
            "Metadata": {
                "AWS::CloudFormation::Designer": {
                    "id": "778df171-5601-41df-a1a8-d2cf28ab2abb"
                }
            }
        },
        "rPrivateDBSubnetNetworkAclAssociationAZ1": {
            "Type": "AWS::EC2::SubnetNetworkAclAssociation",
            "Properties": {
                "SubnetId": {
                    "Ref": "rPrivateDBSubnetAZ1"
                },
                "NetworkAclId": {
                    "Ref": "rPrivateNetworkAcl"
                }
            },
            "Metadata": {
                "AWS::CloudFormation::Designer": {
                    "id": "3a70cc73-78af-4dfe-b196-e7c44b8341d3"
                }
            }
        },
        "rPrivateDBSubnetNetworkAclAssociationAZ2": {
            "Type": "AWS::EC2::SubnetNetworkAclAssociation",
            "Properties": {
                "SubnetId": {
                    "Ref": "rPrivateDBSubnetAZ2"
                },
                "NetworkAclId": {
                    "Ref": "rPrivateNetworkAcl"
                }
            },
            "Metadata": {
                "AWS::CloudFormation::Designer": {
                    "id": "c12f73c5-bf8b-48d2-8ff9-021118b874e0"
                }
            }
        },
        "rEIPAZ1": {
            "Type": "AWS::EC2::EIP",
            "Properties": {
                "Domain": "vpc"
            },
            "Metadata": {
                "AWS::CloudFormation::Designer": {
                    "id": "fb03a7a3-eae5-4f35-8ea1-a1c8ef661186"
                }
            }
        },
        "rEIPAZ2": {
            "Type": "AWS::EC2::EIP",
            "Properties": {
                "Domain": "vpc"
            },
            "Metadata": {
                "AWS::CloudFormation::Designer": {
                    "id": "f1d848b4-49ea-4e9f-8a8b-053b2270a341"
                }
            }
        },
        "rAPPNATGatewayAZ1": {
            "Type": "AWS::EC2::NatGateway",
            "Properties": {
                "AllocationId": {
                    "Fn::GetAtt": [
                        "rEIPAZ1",
                        "AllocationId"
                    ]
                },
                "SubnetId": {
                    "Ref": "rManagementSubnetAZ1"
                }
            },
            "Metadata": {
                "AWS::CloudFormation::Designer": {
                    "id": "9720db45-f61d-4f79-b1ee-509aba3dafba"
                }
            }
        },
        "rAPPNATGatewayAZ2": {
            "Type": "AWS::EC2::NatGateway",
            "Properties": {
                "AllocationId": {
                    "Fn::GetAtt": [
                        "rEIPAZ2",
                        "AllocationId"
                    ]
                },
                "SubnetId": {
                    "Ref": "rManagementSubnetAZ2"
                }
            },
            "Metadata": {
                "AWS::CloudFormation::Designer": {
                    "id": "f10815df-0eaa-4247-9b03-62e4d221330b"
                }
            }
        },
        "rNATRouteAZ1": {
            "Type": "AWS::EC2::Route",
            "Properties": {
                "RouteTableId": {
                    "Ref": "rPrivateRouteTable"
                },
                "DestinationCidrBlock": "0.0.0.0/0",
                "NatGatewayId": {
                    "Ref": "rAPPNATGatewayAZ1"
                }
            },
            "Metadata": {
                "AWS::CloudFormation::Designer": {
                    "id": "34717dce-6283-42dc-8a69-d8244d3f5ea4"
                }
            }
        },
		"rS3Bucket" : {
			"Type" : "AWS::S3::Bucket",
			"Properties" : {
			"AccessControl" : "PublicRead",
			"Tags" : [{
                  "Key"   : "Name",
                  "Value" :{
						"Ref":"pGuidewireS3RepoName"
				  } 
                }]
			}
		},
        "WEBIAMRole": {
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
                        "PolicyName": "S3Profile",
                        "PolicyDocument": {
                            "Version": "2012-10-17",
                            "Statement": [
                                {
                                    "Action": [
                                        "s3:Get*",
                                        "s3:List*"
                                    ],
                                    "Effect": "Allow",
                                    "Resource": "*"
                                }
                            ]
                        }
                    },
                    {
                        "PolicyName": "CloudwatchLogsAdmin",
                        "PolicyDocument": {
                            "Version": "2012-10-17",
                            "Statement": [
                                {
                                    "Action": [
                                        "logs:CreateLogGroup",
                                        "logs:CreateLogStream",
                                        "logs:PutLogEvents",
                                        "logs:DescribeLogStreams"
                                    ],
                                    "Effect": "Allow",
                                    "Resource": [
                                        "arn:aws:logs:*:*:*"
                                    ]
                                }
                            ]
                        }
                    }
                ]
            },
            "Metadata": {
                "AWS::CloudFormation::Designer": {
                    "id": "10c6da3b-76b0-40ca-babd-363e9b3cda95"
                }
            }
        },
        "APPIAMRole": {
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
                        "PolicyName": "root",
                        "PolicyDocument": {
                            "Version": "2012-10-17",
                            "Statement": [
                                {
                                    "Effect": "Allow",
                                    "Action": "*",
                                    "Resource": "*"
                                }
                            ]
                        }
                    },
                    {
                        "PolicyName": "S3Profile",
                        "PolicyDocument": {
                            "Version": "2012-10-17",
                            "Statement": [
                                {
                                    "Action": [
                                        "s3:Get*",
                                        "s3:List*"
                                    ],
                                    "Effect": "Allow",
                                    "Resource": "*"
                                }
                            ]
                        }
                    },
                    {
                        "PolicyName": "CloudwatchLogsAdmin",
                        "PolicyDocument": {
                            "Version": "2012-10-17",
                            "Statement": [
                                {
                                    "Action": [
                                        "logs:CreateLogGroup",
                                        "logs:CreateLogStream",
                                        "logs:PutLogEvents",
                                        "logs:DescribeLogStreams"
                                    ],
                                    "Effect": "Allow",
                                    "Resource": [
                                        "arn:aws:logs:*:*:*"
                                    ]
                                }
                            ]
                        }
                    }
                ]
            },
            "Metadata": {
                "AWS::CloudFormation::Designer": {
                    "id": "1f87b093-21a8-4afd-b619-1d619eb68df7"
                }
            }
        },
        "WebInstanceProfile": {
            "Type": "AWS::IAM::InstanceProfile",
            "Properties": {
                "Path": "/",
                "Roles": [
                    {
                        "Ref": "WEBIAMRole"
                    }
                ]
            },
            "Metadata": {
                "AWS::CloudFormation::Designer": {
                    "id": "9b31681f-9a95-471f-b84d-036c46bbe97c"
                }
            }
        },
        "AppInstanceProfile": {
            "Type": "AWS::IAM::InstanceProfile",
            "Properties": {
                "Path": "/",
                "Roles": [
                    {
                        "Ref": "APPIAMRole"
                    }
                ]
            },
            "Metadata": {
                "AWS::CloudFormation::Designer": {
                    "id": "bee4e275-0b83-4bb6-b8c4-9832c5f3785f"
                }
            }
        },
        "rGuidewareEncryptionKey": {
            "Type": "AWS::KMS::Key",
            "Properties": {
                "Description": "A Guideware Encryption key",
                "KeyPolicy": {
                    "Version": "2012-10-17",
                    "Id": "key-default-1",
                    "Statement": [
                        {
                            "Sid": "Allow administration of the key",
                            "Effect": "Allow",
                            "Principal": {
                                "AWS": {
                                    "Ref": "GuidewareKMSUser"
                                }
                            },
                            "Action": [
                                "kms:Create*",
                                "kms:Describe*",
                                "kms:Enable*",
                                "kms:List*",
                                "kms:Put*",
                                "kms:Update*",
                                "kms:Revoke*",
                                "kms:Disable*",
                                "kms:Get*",
                                "kms:Delete*",
                                "kms:ScheduleKeyDeletion",
                                "kms:CancelKeyDeletion"
                            ],
                            "Resource": "*"
                        }
                    ]
                }
            },
            "Metadata": {
                "AWS::CloudFormation::Designer": {
                    "id": "dab0cf5d-1564-43de-a426-cb17cd63acea"
                }
            }
        },
     "ManagementLayerStack": {
            "Type": "AWS::CloudFormation::Stack",
            "Properties": {
                "TemplateURL": {
                    "Fn::Join": [
                        "",
                        [
                            {
                                "Fn::FindInMap": [
                                    "AWSInfoRegionMap",
                                    {
                                        "Ref": "AWS::Region"
                                    },
                                    "QuickStartS3URL"
                                ]
                            },
                            "/",
                            {
                                "Ref": "QSS3BucketName"
                            },
                            "/",
                            {
                                "Ref": "QSS3KeyPrefix"
                            },
                            "/",
                            "gw-aws-dmz.template"
                        ]
                    ]
                },
                "Parameters": {
                    "pRDPLocation": {
                        "Ref": "pRDPLocation"
                    },
                    "pBastionInstanceType": {
                        "Ref": "pBastionInstanceType"
                    },
                    "pBastionKeyName": {
                        "Ref": "pBastionKeyName"
                    },
                    "pVPCID": {
                        "Ref": "rVPC"
                    },
                    "pManagementSubnetIDAZ1": {
                        "Ref": "rManagementSubnetAZ1"
                    },
                    "pManagementSubnetIDAZ2": {
                        "Ref": "rManagementSubnetAZ2"
                    }

                }
            },
            "Metadata": {
                "AWS::CloudFormation::Designer": {
                    "id": "f548160a-5674-41a3-97e7-1806a3623484"
                }
            }
        },
		"WebLayerStack": {
            "Type": "AWS::CloudFormation::Stack",
            "DependsOn": "ManagementLayerStack",
            "Properties": {
                "TemplateURL": {
                    "Fn::Join": [
                        "",
                        [
                            {
                                "Fn::FindInMap": [
                                    "AWSInfoRegionMap",
                                    {
                                        "Ref": "AWS::Region"
                                    },
                                    "QuickStartS3URL"
                                ]
                            },
                            "/",
                            {
                                "Ref": "QSS3BucketName"
                            },
                            "/",
                            {
                                "Ref": "QSS3KeyPrefix"
                            },
                            "/",
                            "gw-aws-web.template"
                        ]
                    ]
                },
                "Parameters": {
                    "pRDPLocation": {
                        "Ref": "pRDPLocation"
                    },
                    "pWebServerInstanceType": {
                        "Ref": "pWebServerInstanceType"
                    },
                    "pWebServerKeyName": {
                        "Ref": "pWebServerKeyName"
                    },
                    "pVPCID": {
                        "Ref": "rVPC"
                    },
                    "pwebPrivateSubnetIDAZ1": {
                        "Ref": "rPrivateWebSubnetAZ1"
                    },
                    "pwebPrivateSubnetAZ1": {
                        "Fn::GetAtt": [
                            "rPrivateWebSubnetAZ1",
                            "AvailabilityZone"
                        ]
                    },
                    "pwebPrivateSubnetIDAZ2": {
                        "Ref": "rPrivateWebSubnetAZ2"
                    },
                    "pwebPrivateSubnetAZ2": {
                        "Fn::GetAtt": [
                            "rPrivateWebSubnetAZ2",
                            "AvailabilityZone"
                        ]
                    }

                }
            },
            "Metadata": {
                "AWS::CloudFormation::Designer": {
                    "id": "0d9d81b1-995c-458f-a5bc-f16c686bdc1d"
                }
            }
        },	
		"AppLayerStack": {
            "Type": "AWS::CloudFormation::Stack",
            "DependsOn": "WebLayerStack",
            "Properties": {
                "TemplateURL": {
                    "Fn::Join": [
                        "",
                        [
                            {
                                "Fn::FindInMap": [
                                    "AWSInfoRegionMap",
                                    {
                                        "Ref": "AWS::Region"
                                    },
                                    "QuickStartS3URL"
                                ]
                            },
                            "/",
                            {
                                "Ref": "QSS3BucketName"
                            },
                            "/",
                            {
                                "Ref": "QSS3KeyPrefix"
                            },
                            "/",
                            "gw-aws-app.template"
                        ]
                    ]
                },
                "Parameters": {
                    "pRDPLocation": {
                        "Ref": "pRDPLocation"
                    },
                    "pAppServerInstanceType": {
                        "Ref": "pAppInstanceType"
                    },
                    "pAppServerKeyName": {
                        "Ref": "pAppServerKeyName"
                    },
                    "pVPCID": {
                        "Ref": "rVPC"
                    },
                    "pappPrivateSubnetIDAZ1": {
                        "Ref": "rPrivateAppSubnetAZ1"
                    },
                    "pappPrivateSubnetAZ1": {
                        "Fn::GetAtt": [
                            "rPrivateAppSubnetAZ1",
                            "AvailabilityZone"
                        ]
                    },
                    "pappPrivateSubnetIDAZ2": {
                        "Ref": "rPrivateAppSubnetAZ2"
                    },
                    "pappPrivateSubnetAZ2": {
                        "Fn::GetAtt": [
                            "rPrivateAppSubnetAZ2",
                            "AvailabilityZone"
                        ]
                    }

                }
            },
            "Metadata": {
                "AWS::CloudFormation::Designer": {
                    "id": "0d9d81b1-995c-458f-a5bc-f16c686bdc1d"
                }
            }
        },			

         "DBLayerStack": {
            "Type": "AWS::CloudFormation::Stack",
            "Properties": {
                "TemplateURL": {
                    "Fn::Join": [
                        "",
                        [
                            {
                                "Fn::FindInMap": [
                                    "AWSInfoRegionMap",
                                    {
                                        "Ref": "AWS::Region"
                                    },
                                    "QuickStartS3URL"
                                ]
                            },
                            "/",
                            {
                                "Ref": "QSS3BucketName"
                            },
                            "/",
                            {
                                "Ref": "QSS3KeyPrefix"
                            },
                            "/",
                            "gw-aws-db.template"
                        ]
                    ]
                },
                "Parameters": {
                    "pDBName": {
                        "Ref": "pDBName"
                    },
                    "pDBUser": {
                        "Ref": "pDBUser"
                    },
                    "pDBPassword": {
                        "Ref": "pDBPassword"
                    },
                    "pVPCID": {
                        "Ref": "rVPC"
                    },
                    "pPrimaryPrivateSubnet": {
                        "Ref": "rPrivateDBSubnetAZ1"
                    },
                    "pSecondaryPrivateSubnet": {
                        "Ref": "rPrivateDBSubnetAZ2"
                    }
                }
            },
            "Metadata": {
                "AWS::CloudFormation::Designer": {
                    "id": "0793bccd-9da9-4068-8d6c-d12c1b9e1e8d"
                }
            }
        }
    },
    "Outputs": {
        "VPCId": {
            "Description": "VPC ID",
            "Value": {
                "Ref": "rVPC"
            },
            "Export": {
                "Name": {
                    "Fn::Sub": "${AWS::StackName}-VPCID"
                }
            }
        },
        "rManagementSubnetAZ1": {
            "Description": "The subnet ID to use for Management subnet in AZ1",
            "Value": {
                "Ref": "rManagementSubnetAZ1"
            },
            "Export": {
                "Name": {
                    "Fn::Sub": "${AWS::StackName}-ManagementSubnetAZ1"
                }
            }
        },
        "rManagementSubnetAZ2": {
            "Description": "The subnet ID to use for Management Subnet in AZ2",
            "Value": {
                "Ref": "rManagementSubnetAZ2"
            },
            "Export": {
                "Name": {
                    "Fn::Sub": "${AWS::StackName}-ManagementSubnetAZ2"
                }
            }
        },
        "rPrivateAppSubnetAZ1": {
            "Description": "The Application PrivateSubnet's AZ1",
            "Export": {
                "Name": {
                    "Fn::Sub": "${AWS::StackName}-PrivateAppSubnetAZ1"
                }
            },
            "Value": {
                "Fn::GetAtt": [
                    "rPrivateAppSubnetAZ1",
                    "AvailabilityZone"
                ]
            }
        },
        "rPrivateAppSubnetAZ2": {
            "Description": "The Application PrivateSubnet's AZ2",
            "Export": {
                "Name": {
                    "Fn::Sub": "${AWS::StackName}-PrivateAppSubnetAZ2"
                }
            },
            "Value": {
                "Fn::GetAtt": [
                    "rPrivateAppSubnetAZ2",
                    "AvailabilityZone"
                ]
            }
        },
        "rAPPNATGatewayAZ1": {
            "Description": "The Application NAT Gateway in AZ1",
            "Value": {
                "Ref": "rAPPNATGatewayAZ1"
            },
            "Export": {
                "Name": {
                    "Fn::Sub": "${AWS::StackName}-rAPPNATGatewayAZ1"
                }
            }
        },
        "rAPPNATGatewayAZ2": {
            "Description": "The Application NAT Gateway in AZ2",
            "Value": {
                "Ref": "rAPPNATGatewayAZ2"
            },
            "Export": {
                "Name": {
                    "Fn::Sub": "${AWS::StackName}-rAPPNATGatewayAZ2"
                }
            }
        },
        "rPrivateAppSubnetIDAZ1": {
            "Description": "The Application PrivateSubnet ID in AZ1",
            "Value": {
                "Ref": "rPrivateAppSubnetAZ1"
            },
            "Export": {
                "Name": {
                    "Fn::Sub": "${AWS::StackName}-AppSubnetIDAZ1"
                }
            }
        },
        "rPrivateAppSubnetIDAZ2": {
            "Description": "The Application PrivateSubnet ID in AZ2",
            "Value": {
                "Ref": "rPrivateAppSubnetAZ2"
            },
            "Export": {
                "Name": {
                    "Fn::Sub": "${AWS::StackName}-AppSubnetIDAZ2"
                }
            }
        },
        "rPrivateWebSubnetIDAZ1": {
            "Description": "The Web PrivateSubnet for AZ1",
            "Value": {
                "Ref": "rPrivateWebSubnetAZ1"
            },
            "Export": {
                "Name": {
                    "Fn::Sub": "${AWS::StackName}-webSubnetIDAZ1"
                }
            }
        },
        "rPrivateWebSubnetAZ1": {
            "Description": "The Web PrivateSubnet's AZ1",
            "Export": {
                "Name": {
                    "Fn::Sub": "${AWS::StackName}-webPrivateSubnetAZ"
                }
            },
            "Value": {
                "Fn::GetAtt": [
                    "rPrivateWebSubnetAZ1",
                    "AvailabilityZone"
                ]
            }
        },
        "rPrivateWebSubnetIDAZ2": {
            "Description": "The Web PrivateSubnet in AZ2",
            "Value": {
                "Ref": "rPrivateWebSubnetAZ2"
            },
            "Export": {
                "Name": {
                    "Fn::Sub": "${AWS::StackName}-webSubnetIDAZ2"
                }
            }
        },
        "rPrivateWebSubnetAZ2": {
            "Description": "The Web PrivateSubnet's in AZ2",
            "Export": {
                "Name": {
                    "Fn::Sub": "${AWS::StackName}-webPrivateSubnetAZ2"
                }
            },
            "Value": {
                "Fn::GetAtt": [
                    "rPrivateWebSubnetAZ2",
                    "AvailabilityZone"
                ]
            }
        },
        "rPrivateDBSubnetAZ2": {
            "Description": "The DB Secondary PrivateSubnet ID in AZ2",
            "Value": {
                "Ref": "rPrivateDBSubnetAZ2"
            },
            "Export": {
                "Name": {
                    "Fn::Sub": "${AWS::StackName}-dbSecondarySubnetID"
                }
            }
        },
        "rPrivateDBSubnetAZ1": {
            "Description": "The DB Primary PrivateSubnet's AZ",
            "Export": {
                "Name": {
                    "Fn::Sub": "${AWS::StackName}-dbPrimaryPrivateSubnetAZ"
                }
            },
            "Value": {
                "Fn::GetAtt": [
                    "rPrivateDBSubnetAZ1",
                    "AvailabilityZone"
                ]
            }
        },
        "rPrivateDBSubnetAZ1ID": {
            "Description": "The DB Primary PrivateSubnet ID in AZ1",
            "Value": {
                "Ref": "rPrivateDBSubnetAZ1"
            },
            "Export": {
                "Name": {
                    "Fn::Sub": "${AWS::StackName}-dbPrimarySubnetID"
                }
            }
        },
		"rS3Bucket":{
			"Description": "The S3 Repo  URL ",
				"Value": {
					"Fn::GetAtt": [
						"rS3Bucket",
						"WebsiteURL"
					]
            }
		}
    }
}