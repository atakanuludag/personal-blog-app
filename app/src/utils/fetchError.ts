export default class FetchError {
  public isFetchErr: boolean = true;

  constructor(
    public errResponse: Response,
    public message: string | undefined
  ) {}
}
