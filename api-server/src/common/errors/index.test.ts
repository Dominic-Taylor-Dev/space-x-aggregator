import * as errors from "./";
import "jest";

const UNIXTIME_26_10_2023 = 1698339936;

describe("errorReferenceCode", () => {
  beforeAll(() => {
    jest.useFakeTimers();
    jest.setSystemTime(new Date(UNIXTIME_26_10_2023 * 1000));
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it("should generate the error reference code in the correct format", () => {
    const result = errors.errorReferenceCode();
    expect(result).toContain(`ERR-${UNIXTIME_26_10_2023 * 1000}-`);
  });

  it("should call randomString", () => {
    const spy = jest.spyOn(errors, "randomString");
    errors.errorReferenceCode();
    expect(spy).toHaveBeenCalled();
  });
});
