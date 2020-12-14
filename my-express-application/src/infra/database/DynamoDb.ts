import { DynamoDB } from 'aws-sdk';

export class DynamoDbConnection {
    private dynamodb: DynamoDB.DocumentClient;

    constructor() {
        if (process.env.IS_OFFLINE === 'true') {
            this.dynamodb = new DynamoDB.DocumentClient({
                region: 'localhost',
                endpoint: 'http://localhost:8000',
                apiVersion: '2012-08-10'
            });
        } else {
            this.dynamodb = new DynamoDB.DocumentClient({
                apiVersion: '2012-08-10'
            });
        }
    }

    public insertItem(tableName: string, item: any): any {
        const params: DynamoDB.DocumentClient.PutItemInput = {
            TableName: tableName,
            Item: item
        };
        this.dynamodb.put(params, (error) => {
            if (error) {
                console.log(error);
            }
        });
    }

    public async getItems(tableName: string, fields: string): Promise<any> {
        const params: DynamoDB.DocumentClient.ScanInput = {
            TableName: tableName,
            ProjectionExpression: fields,
            ExpressionAttributeNames: { '#name': 'name', '#type': 'type' }
        };
        const result = await this.dynamodb.scan(params).promise();
        return result;
    }
}
