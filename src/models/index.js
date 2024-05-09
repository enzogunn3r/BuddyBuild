// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';

const Gender = {
  "MALE": "MALE",
  "FEMALE": "FEMALE",
  "OTHER": "OTHER"
};

const { UntitledModel, User } = initSchema(schema);

export {
  UntitledModel,
  User,
  Gender
};