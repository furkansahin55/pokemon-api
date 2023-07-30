type CrudAllRequest = {
  Querystring: {
    limit: number;
    offset: number;
  };
};

type CrudIdRequest = {
  Params: {
    name: string;
  };
};
