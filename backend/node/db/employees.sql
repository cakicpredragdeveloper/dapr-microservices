\c employees;
CREATE TABLE  Employees ( EmployeeId varchar(255) NOT NULL, FirstName varchar(255), LastName varchar(255), Email varchar(255), JobTitle varchar(255), PRIMARY KEY (EmployeeId) ); 
SELECT * FROM Employees;

INSERT INTO Employees (EmployeeId, FirstName, LastName, Email, JobTitle)
VALUES ('cc5204ac-28ea-4725-82ca-594ee9a2f158', 'Pansy', 'Maffia', 'pmaffia0@linkedin.com', 'Geological Engineer'),('cbbde000-fa12-4b5c-aa77-021608f91a23', 'Rosella', 'McElree', 'rmcelree1@simplemachines.org', 'Research Associate'),('514ab9f8-274e-41e6-ba79-2b1869adf0aa', 'Annetta', 'Whitsey', 'awhitsey2@hugedomains.com', 'Safety Technician IV'),('58495460-1e78-47d8-ae34-21b76adf1fcb', 'Alana', 'Radloff', 'aradloff3@desdev.cn', 'Nuclear Power Engineer'),('bfa5422d-6ad0-4dc0-87fe-a1401c20718d', 'Suzanne', 'Lount', 'slount4@house.gov', 'Environmental Specialist'),('eeb4d7c1-5c3b-40a7-a78a-c2bbfdf93320', 'Cindy', 'Jacson', 'cjacson5@springer.com', 'Quality Control Specialist'),('9d1b3557-1e45-4156-91c8-e03135dba289', 'Guillermo', 'Cattrell', 'gcattrell6@addtoany.com', 'Research Associate'),('719455aa-2b2f-41a2-99e0-79fb5ddba638', 'Emylee', 'Butterwick', 'ebutterwick7@eventbrite.com', 'Marketing Assistant'),('b0fc6272-8051-4d65-9c98-b2338caa4e4d', 'Wallie', 'Doe', 'wdoe8@netvibes.com', 'Nurse Practicioner'),('30ffeda8-98fa-4c48-a25c-acadf8088043', 'Georgiana', 'Eringey', 'geringey9@shinystat.com', 'Human Resources Manager'),('68075d0c-786e-42b9-b9b4-33cb74c3c05a', 'Fredek', 'Dolton', 'fdoltona@altervista.org', 'Web Designer II'),('c64e9afe-a814-4c53-bbff-960135623a62', 'Stacy', 'Brommage', 'sbrommageb@1688.com', 'Software Consultant'),('e8be2322-6bcf-4dfb-92e7-d1813f94b063', 'Malachi', 'Simonin', 'msimoninc@uiuc.edu', 'Internal Auditor'),('dd90563d-3cfd-47bb-9b41-de2b000921b6', 'Lowell', 'Sevior', 'lseviord@wsj.com', 'Community Outreach Specialist'),('9d097016-f54c-4b53-b973-431e8360a130', 'Curt', 'Attyeo', 'cattyeoe@nytimes.com', 'Senior Quality Engineer'),('e1fb291f-aaaa-4b1e-86f0-81c439e99297', 'Kameko', 'Cattonnet', 'kcattonnetf@usda.gov', 'Assistant Media Planner'),('8aa8ed87-2ee3-41a8-833f-1dfe0811c57f', 'Cart', 'Forster', 'cforsterg@amazonaws.com', 'Research Assistant IV'),('1d54759e-81c3-49d3-a02c-8dd7be8c9d2b', 'Clara', 'Ludwikiewicz', 'cludwikiewiczh@hugedomains.com', 'Business Systems Development Analyst'),('a1c2a157-ff89-48bf-865c-1a6860cf722c', 'Carlyle', 'Bulle', 'cbullei@census.gov', 'Human Resources Manager'),('f1e3cc2d-b986-4592-b505-fd5aa2654d07', 'Ina', 'Hawton', 'ihawtonj@photobucket.com', 'Project Manager'),('60c9c8b9-0cc2-494e-bc81-ce188ddd8cfe', 'Sukey', 'Dancer', 'sdancerk@pbs.org', 'Analyst Programmer'),('aac0746a-ebc6-4c68-bff3-2102fd66ab92', 'Gabriellia', 'Barke', 'gbarkel@about.me', 'Speech Pathologist'),('e2a08514-6d31-4f8a-a767-7edb57d986f3', 'Huberto', 'Severn', 'hsevernm@intel.com', 'General Manager'),('85883ca4-230d-45b9-8c8f-c309ac990f70', 'Kienan', 'Barcroft', 'kbarcroftn@stanford.edu', 'Information Systems Manager'),('2ce16180-c884-41ad-bf57-53d2bbe0b259', 'Elie', 'Trodd', 'etroddo@wsj.com', 'Payment Adjustment Coordinator'),('d9a4f171-d5c2-4560-baac-40af1e43d7e3', 'Marti', 'Filyakov', 'mfilyakovp@storify.com', 'Web Designer IV'),('299375c5-2284-4802-a1f1-421804ab1d9e', 'Goraud', 'Blaney', 'gblaneyq@sitemeter.com', 'Technical Writer'),('4d6b2b62-8d70-4aa1-9ef0-eff9db64a4f0', 'Farrel', 'Esherwood', 'fesherwoodr@cam.ac.uk', 'Assistant Professor'),('8a2ca601-37ca-4cab-ab03-3c95cc49f3b3', 'Flossy', 'Jagger', 'fjaggers@ibm.com', 'Account Executive'),('46a8652a-3763-445a-ae3c-4dd8a64e42db', 'Renato', 'Andriolli', 'randriollit@constantcontact.com', 'Human Resources Manager'),('60fca317-5ab2-478e-9583-c3eb45a443d5', 'Gayler', 'Lodovichi', 'glodovichiu@amazon.de', 'Sales Representative'),('4d670528-837c-4ca8-887d-8db8a7c3b455', 'Piggy', 'Baglin', 'pbaglinv@comcast.net', 'Nurse Practicioner'),('168a1a8c-b1f8-4bac-8ae2-100ef436ab7c', 'Tobias', 'Bunning', 'tbunningw@netvibes.com', 'Help Desk Operator'),('83349df1-00e8-44a0-a6b0-7caee5e54066', 'Vivia', 'Jobin', 'vjobinx@uiuc.edu', 'Safety Technician I'),('7ce8046b-8337-4665-be68-de27359369a5', 'Sheelah', 'Mackro', 'smackroy@github.io', 'VP Quality Control'),('1b0985bc-b1c3-442f-a6f1-b76493f5f456', 'Ariadne', 'Collcutt', 'acollcuttz@hibu.com', 'Financial Advisor'),('ebf734ca-f704-478c-b7ce-8e0446c00019', 'Isak', 'Coughan', 'icoughan10@bigcartel.com', 'Registered Nurse'),('d5faeff5-8c54-4725-9d73-72249345bc67', 'Katrinka', 'Linnell', 'klinnell11@cpanel.net', 'Biostatistician IV'),('92298827-f752-4ad9-a903-0fae85bdc123', 'Melodee', 'Feetham', 'mfeetham12@hp.com', 'Senior Quality Engineer'),('9e2ca81e-1a3f-4a3b-9155-2e8ba96e5059', 'Rozelle', 'Ciobutaro', 'rciobutaro13@cafepress.com', 'Senior Cost Accountant'),('5bff71b6-d821-4cd4-ab9c-6c9c91114623', 'Loretta', 'De Laspee', 'ldelaspee14@lulu.com', 'Engineer III'),('bf1ce0bb-0881-432e-b3a0-9ca65bdc8f39', 'Don', 'Linch', 'dlinch15@harvard.edu', 'Staff Scientist'),('fe615c1b-64ca-4bcd-8299-1db45b29dcdb', 'Gill', 'Crick', 'gcrick16@live.com', 'Speech Pathologist'),('3e2108e0-1345-487f-aa4d-0d28522104ab', 'Dania', 'Richardson', 'drichardson17@java.com', 'Payment Adjustment Coordinator'),('e3f93692-8690-4c87-ac39-100ecd8663b7', 'Allison', 'Shadbolt', 'ashadbolt18@shop-pro.jp', 'General Manager'),('28eedb2b-7475-4111-a569-e09e8acdfacb', 'Tracy', 'Fewlass', 'tfewlass19@miitbeian.gov.cn', 'Account Coordinator'),('40ab7fdc-52e9-488f-950c-8c334d5c9af0', 'Rusty', 'Kibard', 'rkibard1a@blogs.com', 'Quality Control Specialist'),('5a162167-be9f-491d-901b-238aca13156a', 'Margo', 'Byfield', 'mbyfield1b@myspace.com', 'Information Systems Manager'),('c637ab0a-5e3c-4de6-980d-a4f300e601b8', 'Lenora', 'Gillinghams', 'lgillinghams1c@redcross.org', 'Pharmacist'),('78309820-798c-4e63-b2b1-f09bf9322db4', 'Kelley', 'Tinsey', 'ktinsey1d@gnu.org', 'Social Worker');

CREATE TABLE Logs ( Id SERIAL NOT NULL, WorkingTime varchar(255), OnDay timestamp, EntryTimestamp timestamp, ExitTimestamp timestamp, EmployeeId varchar(255) NOT NULL, PRIMARY KEY (Id), FOREIGN KEY (EmployeeId) REFERENCES Employees(EmployeeId) ); 
select * from Logs;