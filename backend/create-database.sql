CREATE DATABASE IF NOT EXISTS `graphql-sample`;

CREATE USER IF NOT EXISTS 'gql_sample'@'localhost' IDENTIFIED BY 'gql_sample_123';
GRANT Alter ON `graphql-sample`.* TO 'gql_sample'@'localhost';
GRANT Create ON `graphql-sample`.* TO 'gql_sample'@'localhost';
GRANT Create view ON `graphql-sample`.* TO 'gql_sample'@'localhost';
GRANT Delete ON `graphql-sample`.* TO 'gql_sample'@'localhost';
GRANT Delete history ON `graphql-sample`.* TO 'gql_sample'@'localhost';
GRANT Drop ON `graphql-sample`.* TO 'gql_sample'@'localhost';
GRANT Grant option ON `graphql-sample`.* TO 'gql_sample'@'localhost';
GRANT Index ON `graphql-sample`.* TO 'gql_sample'@'localhost';
GRANT Insert ON `graphql-sample`.* TO 'gql_sample'@'localhost';
GRANT References ON `graphql-sample`.* TO 'gql_sample'@'localhost';
GRANT Select ON `graphql-sample`.* TO 'gql_sample'@'localhost';
GRANT Show view ON `graphql-sample`.* TO 'gql_sample'@'localhost';
GRANT Trigger ON `graphql-sample`.* TO 'gql_sample'@'localhost';
GRANT Update ON `graphql-sample`.* TO 'gql_sample'@'localhost';
GRANT Alter routine ON `graphql-sample`.* TO 'gql_sample'@'localhost';
GRANT Create routine ON `graphql-sample`.* TO 'gql_sample'@'localhost';
GRANT Create temporary tables ON `graphql-sample`.* TO 'gql_sample'@'localhost';
GRANT Execute ON `graphql-sample`.* TO 'gql_sample'@'localhost';
GRANT Lock tables ON `graphql-sample`.* TO 'gql_sample'@'localhost';

FLUSH PRIVILEGES;
