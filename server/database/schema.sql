CREATE TABLE user (
    id INT unsigned AUTO_INCREMENT PRIMARY KEY NOT NULL,
    username VARCHAR(255) NOT NULL,
    mail VARCHAR(255) NOT NULL unique,
    password VARCHAR(255) NOT NULL
);

CREATE TABLE project (
    id INT unsigned AUTO_INCREMENT PRIMARY KEY NOT NULL,
    title VARCHAR(255) NOT NULL,
    stack_technique VARCHAR(255) NOT NULL,
    project_management VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    image VARCHAR(255) NOT NULL
    -- user_id INT UNSIGNED NOT NULL,
    -- FOREIGN KEY (user_id) REFERENCES user(id)
);

CREATE TABLE opinion (
    id INT unsigned AUTO_INCREMENT PRIMARY KEY NOT NULL,
    opinion TEXT NOT NULL,
    project_id INT UNSIGNED NOT NULL,
    user_id INT UNSIGNED NOT NULL,
    FOREIGN KEY (project_id) REFERENCES project(id),
    FOREIGN KEY (user_id) REFERENCES user(id)
);
