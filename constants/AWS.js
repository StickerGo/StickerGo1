console.log('check AWS', process.env.IDENTITY);
import { IDENTITY, REGION, BUCKET } from '../secrets';
export default {
  Amplifyconfigure: {
    Auth: {
      identityPoolId: IDENTITY, //REQUIRED - Amazon Cognito Identity Pool ID
      region: REGION, // REQUIRED - Amazon Cognito Region
    },
    Storage: {
      bucket: BUCKET, //REQUIRED -  Amazon S3 bucket
      region: REGION, //OPTIONAL -  Amazon service region
    },
  },
};
