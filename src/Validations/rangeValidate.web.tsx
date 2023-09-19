export const rangeValidate = (lower_range: any, upper_range: any) => {
  if (upper_range < 0 || upper_range === 0) {
    return {
      status: true,
      message: `Upper range is required.`,
    };
  }
  if (parseInt(lower_range) >= parseInt(upper_range)) {
    return {
      status: true,
      message: `Upper range should be larger than lower range.`,
    };
  }
  return { status: false, message: "" };
};
