{
  "$schema": "http://schema.management.azure.com/schemas/2015-01-01/deploymentTemplate.json#",
  "contentVersion": "1.0.0.0",
  "parameters": {
    "serverName": {
      "type": "string",
      "metadata": {
        "description": "The name of the new database server to create."
      }
    },
    "serverLocation": {
      "type": "string",
      "metadata": {
        "description": "The location of the database server."
      }
    },
    "administratorLogin": {
      "type": "string",
      "metadata": {
        "description": "The account name to use for the database server administrator."
      }
    },
    "administratorLoginPassword": {
      "type": "securestring",
      "metadata": {
        "description": "The password to use for the database server administrator."
      }
    },
    "databaseName": {
      "type": "string",
      "metadata": {
        "description": "The name of the new database to create."
      }
    },
    "collation": {
      "type": "string",
      "defaultValue": "SQL_Latin1_General_CP1_CI_AS",
      "metadata": {
        "description": "The database collation for governing the proper use of characters."
      }
    },
    "edition": {
      "type": "string",
      "defaultValue": "Standard",
	  "allowedValues": [
        "Basic",
        "Standard",
        "Premium"
      ],
      "metadata": {
        "description": "The type of database to create. The available options are: Web, Business, Basic, Standard, and Premium."
      }
    },
    "maxSizeBytes": {
      "type": "string",
      "defaultValue": "1073741824",
      "metadata": {
        "description": "The maximum size, in bytes, for the database"
      }
    },
    "requestedServiceObjectiveName": {
      "type": "string",
      "defaultValue": "S0",
      "metadata": {
        "description": "The name corresponding to the performance level for edition. The available options are: Shared, Basic, S0, S1, S2, S3, P1, P2, and P3."
      }
    },
    "eventTypesToAudit": {
      "type": "string",
      "defaultValue": "All",
      "metadata": {
        "description": "The event type to audit."
      }
    }
  },
  "resources": [
    {
      "name": "[parameters('serverName')]",
      "type": "Microsoft.Sql/servers",
      "location": "[parameters('serverLocation')]",
      "apiVersion": "2014-04-01-preview",
      "properties": {
        "administratorLogin": "[parameters('administratorLogin')]",
        "administratorLoginPassword": "[parameters('administratorLoginPassword')]",
        "version": "12.0"
      },
      "resources": [
        {
          "name": "[parameters('databaseName')]",
          "type": "databases",
          "location": "[parameters('serverLocation')]",
          "apiVersion": "2014-04-01-preview",
          "dependsOn": [
            "[concat('Microsoft.Sql/servers/', parameters('serverName'))]"
          ],
          "properties": {
            "edition": "[parameters('edition')]",
            "collation": "[parameters('collation')]",
            "maxSizeBytes": "[parameters('maxSizeBytes')]",
            "requestedServiceObjectiveName": "[parameters('requestedServiceObjectiveName')]"
          },
          "resources": [
            {
              "apiVersion": "2014-04-01-preview",
              "type": "auditingPolicies",
              "name": "Default",
              "dependsOn": [
                "[concat('Microsoft.Sql/servers/', parameters('serverName'), '/databases/',parameters('databaseName'))]"
              ],
              "properties": {
                "auditingState": "Enabled",
                "storageAccountName": "<your-storage-account-name>",
                "storageAccountKey": "<your-storage-account-key>",
                "storageAccountResourceGroupName": "<your-storage-account-resource-group-name>",
                "storageAccountSubscriptionId": "<your-storage-account-subscriptionid>",
                "eventTypesToAudit": "parameters('eventTypesToAudit')"
              }
            },
            {
              "apiVersion": "2015-05-01-preview",
              "type": "securityAlertPolicies",
              "name": "Default",
              "dependsOn": [
                "[concat('Microsoft.Sql/servers/', parameters('serverName'), '/databases/',parameters('databaseName'))]",
                "[concat('Microsoft.Sql/servers/', parameters('serverName'), '/databases/',parameters('databaseName'), '/auditingPolicies/Default')]"
              ],
              "properties": {
                "state": "Enabled",
                "disabledAlerts": "",
                "emailAddresses": "abcd@efgh.com",
                "emailAccountAdmins": "true"
              }
            }
          ]
        },
        {
          "apiVersion": "2014-04-01-preview",
          "dependsOn": [
            "[concat('Microsoft.Sql/servers/', parameters('serverName'))]"
          ],
          "location": "[parameters('serverLocation')]",
          "name": "AllowAllWindowsAzureIps",
          "properties": {
            "endIpAddress": "0.0.0.0",
            "startIpAddress": "0.0.0.0"
          },
          "type": "firewallrules"
        }
      ]
    }
  ]
}