-- Adminer 4.8.1 MySQL 5.5.5-10.6.5-MariaDB-1:10.6.5+maria~focal dump

SET NAMES utf8;
SET time_zone = '+00:00';
SET foreign_key_checks = 0;
SET sql_mode = 'NO_AUTO_VALUE_ON_ZERO';

SET NAMES utf8mb4;

DROP TABLE IF EXISTS `owners`;
CREATE TABLE `owners` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `email` varchar(255) NOT NULL,
  `firstname` varchar(255) NOT NULL,
  `middlename` varchar(255) DEFAULT NULL,
  `lastname` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;


DROP TABLE IF EXISTS `pets`;
CREATE TABLE `pets` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `owner_id` bigint(20) NOT NULL,
  `type` varchar(255) NOT NULL,
  `count` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `owner_id` (`owner_id`),
  CONSTRAINT `pets_ibfk_1` FOREIGN KEY (`owner_id`) REFERENCES `owners` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;


-- 2022-03-14 06:22:37
