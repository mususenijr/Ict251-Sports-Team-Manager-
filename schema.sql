CREATE DATABASE IF NOT EXISTS campus_crud;

USE campus_crud;

CREATE TABLE IF NOT EXISTS sports (
    id INT PRIMARY KEY AUTO_INCREMENT,
    player_name VARCHAR(120) NULL,
    position VARCHAR(60) NULL,
    jersey_number INT NULL,
    opponent VARCHAR(120) NULL,
    match_date DATE NULL,
    venue VARCHAR(120) NULL,
    fixture_type VARCHAR(60) NULL,
    status VARCHAR(40) DEFAULT 'Upcoming',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        ON UPDATE CURRENT_TIMESTAMP
);

INSERT INTO sports
(player_name, position, jersey_number, status)
VALUES
('John Banda', 'Forward', 10, 'Player'),
('Peter Phiri', 'Guard', 7, 'Player');

INSERT INTO sports
(opponent, match_date, venue, fixture_type, status)
VALUES
('Campus Eagles', '2026-10-25', 'University Court', 'League', 'Upcoming');
