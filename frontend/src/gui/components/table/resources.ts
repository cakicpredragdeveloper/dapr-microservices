export const sortValues = (first: string, second: string, type: string) => {
  if (first < second) {
    return type === "asc" ? -1 : 1;
  } else if (first > second) {
    return type === "asc" ? 1 : -1;
  } else return 0;
};

export const searchFilter = (value: string, search: string) => value.toLocaleLowerCase().includes(search);

export const checkValue = (value: string | null) => value !== null && value === "";

export const mapEmployeeFields: { [key: string]: string } = {
  EmployeeId: "ID",
  FirstName: "First Name",
  LastName: "Last Name",
  Email: "E-mail",
  JobTitle: "Job Title"
};
