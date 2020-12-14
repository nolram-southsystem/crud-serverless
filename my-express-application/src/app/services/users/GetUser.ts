import { User } from '../../../domain/entities/users';

import { DynamoDbConnection } from '../../../infra/database/DynamoDB';

export class GetUser {
    private USERS_TABLE: string = process.env.USERS_TABLE;
    private dynamoDb: DynamoDbConnection;

    constructor() {
        this.dynamoDb = new DynamoDbConnection();
    }

    public getUsers(): Promise<any> {
        const promise = this.dynamoDb.getItems(
            this.USERS_TABLE,
            'userId, #name, birthday, #type'
        );
        // let users: User[] = [];
        
        return promise;
    }
}
