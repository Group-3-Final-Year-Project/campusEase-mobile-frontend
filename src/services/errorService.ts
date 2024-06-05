export function processErrorResponse(
  error: any,
  errorDescription?: string
): any {
  //do proper logic here...
  throw Error(error as any);
}
