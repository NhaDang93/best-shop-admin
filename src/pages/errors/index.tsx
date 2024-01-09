// ** Component Import
import Error404 from 'src/pages/_404';

const Error = ({
  message,
  statusCode,
}: {
  message: string;
  statusCode: string;
}) => <Error404 message={message} statusCode={statusCode} />;

export default Error;
