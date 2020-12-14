import { User } from '../../../domain/entities/users';
import { AccountTypes } from '../../../domain/enum/types';

import { v1 } from 'uuid';

import { DynamoDbConnection } from '../../../infra/database/DynamoDB';

export class CreateUser {
    private USERS_TABLE: string = process.env.USERS_TABLE;
    private dynamoDb: DynamoDbConnection;

    constructor() {
        this.dynamoDb = new DynamoDbConnection();
    }

    public createUser(name: string, type: string, birthday?: Date): User {
        const accountType = this.getType(type);
        const user: User = {
            userId: v1(),
            name: name,
            type: accountType,
            birthday: birthday
        };

        this.dynamoDb.insertItem(this.USERS_TABLE, user);

        return user;
    }

    private getType(type: string): AccountTypes {
        if (type === 'gold') {
            return AccountTypes.GOLD;
        } else if (type === 'black') {
            return AccountTypes.BLACK;
        } else if (type === 'platinum') {
            return AccountTypes.PLATINUM;
        }
        return AccountTypes.BASIC;
    }
}
