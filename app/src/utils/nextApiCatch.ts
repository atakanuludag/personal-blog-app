import { DEFAULT_ERR_MESSAGE } from "@/config";

type NextApiCatchProps = {
  readonly message: string | undefined;
  readonly statusCode: number;
};

const nextApiCatch = ({ message, statusCode }: NextApiCatchProps) => {
  return Response.json(
    { message: message ?? DEFAULT_ERR_MESSAGE, hasError: true },
    { status: statusCode ?? 500 }
  );
};

export default nextApiCatch;
