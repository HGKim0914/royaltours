-- phpMyAdmin SQL Dump
-- version 4.8.5
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: Jan 20, 2020 at 07:36 AM
-- Server version: 5.7.26
-- PHP Version: 7.2.18

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `royaltours`
--

-- --------------------------------------------------------

--
-- Table structure for table `carcompany`
--

DROP TABLE IF EXISTS `carcompany`;
CREATE TABLE IF NOT EXISTS `carcompany` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(250) DEFAULT NULL,
  `shown` tinyint(1) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=27 DEFAULT CHARSET=utf8;

--
-- Dumping data for table `carcompany`
--

INSERT INTO `carcompany` (`id`, `name`, `shown`) VALUES
(24, '차량회사1', 1),
(25, '차량회사2', 1),
(26, '차량회사3', 0);

-- --------------------------------------------------------

--
-- Table structure for table `cartype`
--

DROP TABLE IF EXISTS `cartype`;
CREATE TABLE IF NOT EXISTS `cartype` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(250) DEFAULT NULL,
  `shown` tinyint(1) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=35 DEFAULT CHARSET=utf8;

--
-- Dumping data for table `cartype`
--

INSERT INTO `cartype` (`id`, `name`, `shown`) VALUES
(32, '차량1', 1),
(33, '차량2', 1),
(34, '차량3', 0);

-- --------------------------------------------------------

--
-- Table structure for table `guide_com`
--

DROP TABLE IF EXISTS `guide_com`;
CREATE TABLE IF NOT EXISTS `guide_com` (
  `userID` varchar(250) NOT NULL,
  `shoppingID` int(11) NOT NULL,
  `com` int(11) DEFAULT NULL,
  PRIMARY KEY (`userID`,`shoppingID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `guide_com`
--

INSERT INTO `guide_com` (`userID`, `shoppingID`, `com`) VALUES
('tester3', 55, 20),
('tester3', 56, 20),
('tester3', 57, 20),
('tester3', 58, 20),
('tester3', 59, 20),
('tester3', 60, 20),
('tester3', 61, 20),
('tester4', 55, 20),
('tester4', 56, 20),
('tester4', 57, 20),
('tester4', 58, 20),
('tester4', 59, 20),
('tester4', 60, 20),
('tester4', 61, 20);

-- --------------------------------------------------------

--
-- Table structure for table `honeybeef`
--

DROP TABLE IF EXISTS `honeybeef`;
CREATE TABLE IF NOT EXISTS `honeybeef` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `category` varchar(250) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `hotel`
--

DROP TABLE IF EXISTS `hotel`;
CREATE TABLE IF NOT EXISTS `hotel` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(250) NOT NULL,
  `shown` tinyint(1) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=33 DEFAULT CHARSET=utf8;

--
-- Dumping data for table `hotel`
--

INSERT INTO `hotel` (`id`, `name`, `shown`) VALUES
(30, '호텔1', 1),
(31, '호텔2', 1),
(32, '호텔3', 0);

-- --------------------------------------------------------

--
-- Table structure for table `land`
--

DROP TABLE IF EXISTS `land`;
CREATE TABLE IF NOT EXISTS `land` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(250) NOT NULL,
  `shown` tinyint(1) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8;

--
-- Dumping data for table `land`
--

INSERT INTO `land` (`id`, `name`, `shown`) VALUES
(7, '캐나다', 0),
(8, '조은투어', 1);

-- --------------------------------------------------------

--
-- Table structure for table `minusfactor`
--

DROP TABLE IF EXISTS `minusfactor`;
CREATE TABLE IF NOT EXISTS `minusfactor` (
  `id` int(11) NOT NULL,
  `name` varchar(250) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

--
-- Dumping data for table `minusfactor`
--

INSERT INTO `minusfactor` (`id`, `name`) VALUES
(1, '회사가 수금한 가이드 팁(로컬행사)'),
(2, '옵션포함의 경우 옵션비용'),
(3, '기타');

-- --------------------------------------------------------

--
-- Table structure for table `misexpense`
--

DROP TABLE IF EXISTS `misexpense`;
CREATE TABLE IF NOT EXISTS `misexpense` (
  `misid` int(11) NOT NULL,
  `miscategory` varchar(250) DEFAULT NULL,
  PRIMARY KEY (`misid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `misexpense`
--

INSERT INTO `misexpense` (`misid`, `miscategory`) VALUES
(1, '주차비용'),
(2, '가스비'),
(3, '가이드 지급비'),
(4, '픽업비용'),
(5, '별도 지급 차량비'),
(6, '기타');

-- --------------------------------------------------------

--
-- Table structure for table `optiontour`
--

DROP TABLE IF EXISTS `optiontour`;
CREATE TABLE IF NOT EXISTS `optiontour` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(250) NOT NULL,
  `companycom` int(11) NOT NULL,
  `tccom` int(11) NOT NULL,
  `shown` tinyint(1) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `tccom` (`tccom`)
) ENGINE=InnoDB AUTO_INCREMENT=29 DEFAULT CHARSET=utf8;

--
-- Dumping data for table `optiontour`
--

INSERT INTO `optiontour` (`id`, `name`, `companycom`, `tccom`, `shown`) VALUES
(25, '설상차', 20, 1, 1),
(26, '플라이오버', 20, 1, 1),
(27, '옵션3', 20, 1, 0),
(28, 'OPTION3', 20, 1, 1);

-- --------------------------------------------------------

--
-- Table structure for table `plusfactor`
--

DROP TABLE IF EXISTS `plusfactor`;
CREATE TABLE IF NOT EXISTS `plusfactor` (
  `id` int(11) NOT NULL,
  `name` varchar(250) CHARACTER SET utf8 NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Dumping data for table `plusfactor`
--

INSERT INTO `plusfactor` (`id`, `name`) VALUES
(1, '행사비 수령'),
(2, '행사비 현지수금'),
(3, '쇼핑매출&가이드 수금'),
(4, '가이드 입금비'),
(5, '기타');

-- --------------------------------------------------------

--
-- Table structure for table `restaurant`
--

DROP TABLE IF EXISTS `restaurant`;
CREATE TABLE IF NOT EXISTS `restaurant` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(250) NOT NULL,
  `shown` tinyint(1) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=46 DEFAULT CHARSET=utf8;

--
-- Dumping data for table `restaurant`
--

INSERT INTO `restaurant` (`id`, `name`, `shown`) VALUES
(43, '식당1', 1),
(44, '식당2', 1),
(45, '식당3', 0);

-- --------------------------------------------------------

--
-- Table structure for table `shoppinglist`
--

DROP TABLE IF EXISTS `shoppinglist`;
CREATE TABLE IF NOT EXISTS `shoppinglist` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(250) NOT NULL,
  `companycom` int(11) NOT NULL,
  `tccom` int(11) NOT NULL,
  `shown` tinyint(1) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `tccom` (`tccom`)
) ENGINE=InnoDB AUTO_INCREMENT=62 DEFAULT CHARSET=utf8;

--
-- Dumping data for table `shoppinglist`
--

INSERT INTO `shoppinglist` (`id`, `name`, `companycom`, `tccom`, `shown`) VALUES
(55, '쇼핑1', 10, 1, 1),
(56, '쇼핑2', 20, 1, 1),
(57, '쇼핑3', 20, 1, 0),
(58, '쇼핑4', 40, 1, 1),
(59, '쇼핑3', 20, 1, 0),
(60, '쇼핑3', 30, 1, 1),
(61, '쇼핑5', 20, 1, 1);

-- --------------------------------------------------------

--
-- Table structure for table `tccom`
--

DROP TABLE IF EXISTS `tccom`;
CREATE TABLE IF NOT EXISTS `tccom` (
  `id` int(11) NOT NULL,
  `com` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `tccom`
--

INSERT INTO `tccom` (`id`, `com`) VALUES
(1, 6);

-- --------------------------------------------------------

--
-- Table structure for table `tour`
--

DROP TABLE IF EXISTS `tour`;
CREATE TABLE IF NOT EXISTS `tour` (
  `tourcode` varchar(250) NOT NULL,
  `startdate` date NOT NULL,
  `enddate` date NOT NULL,
  `guideid` varchar(250) NOT NULL,
  `landid` int(11) DEFAULT NULL,
  `type` varchar(250) DEFAULT NULL,
  `tc` int(11) DEFAULT NULL,
  `numpax` int(11) DEFAULT NULL,
  `numroom` int(11) DEFAULT NULL,
  `inboundlocal` varchar(250) DEFAULT NULL,
  `confirmation` tinyint(1) NOT NULL,
  `sent` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`tourcode`),
  UNIQUE KEY `tourcode_UNIQUE` (`tourcode`),
  KEY `tour_ibfk_1` (`landid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `tour`
--

INSERT INTO `tour` (`tourcode`, `startdate`, `enddate`, `guideid`, `landid`, `type`, `tc`, `numpax`, `numroom`, `inboundlocal`, `confirmation`, `sent`) VALUES
('ROCKY1234568778', '2020-01-18', '2020-01-20', 'tester4', 8, NULL, NULL, NULL, NULL, '인바운드', 0, 0),
('ROCKY123987654', '2019-12-18', '2019-12-28', 'tester3', NULL, '록키코치', 0, 10, 100, '로컬', 1, 1),
('ROCKY987654321', '2020-01-18', '2020-01-22', 'tester4', 8, '당일투어', 1, 100, 100, '인바운드', 1, 1),
('sewrewr', '2020-01-20', '2020-01-22', 'tester4', NULL, NULL, NULL, NULL, NULL, '로컬', 0, 0),
('sfds23424234', '2020-01-23', '2020-01-30', 'tester4', NULL, NULL, NULL, NULL, NULL, '로컬', 0, 0),
('sfds324234', '2020-01-20', '2020-01-22', 'tester4', 8, NULL, NULL, NULL, NULL, '인바운드', 0, 0),
('sterfsdfsdfsd', '2020-01-20', '2020-01-22', 'tester4', NULL, NULL, NULL, NULL, NULL, '로컬', 0, 0),
('TESTTOUR123456789', '2020-01-15', '2020-01-15', 'tester3', 8, '당일투어', 1, 100, 200, '인바운드', 1, 1),
('TESTTOUR987654321', '2020-01-15', '2020-01-17', 'tester3', NULL, NULL, NULL, NULL, NULL, '로컬', 0, 0),
('록키TEST2019', '2020-02-18', '2020-02-28', 'tester3', NULL, NULL, NULL, NULL, NULL, '로컬', 0, 0),
('록키TEST201916156', '2020-01-18', '2020-01-18', 'tester4', NULL, NULL, NULL, NULL, NULL, '로컬', 0, 0),
('록키TEST20192', '2020-03-18', '2020-03-28', 'tester3', 8, NULL, NULL, NULL, NULL, '인바운드', 0, 0),
('록키TEST201923234', '2020-01-18', '2020-01-18', 'tester4', NULL, NULL, NULL, NULL, NULL, '로컬', 0, 0),
('록키TEST2019345435', '2020-01-18', '2020-01-18', 'tester4', NULL, NULL, NULL, NULL, NULL, '로컬', 0, 0),
('빅토리아20190824', '2020-02-18', '2020-02-29', 'tester4', NULL, '록키코치', 0, 100, 10, '로컬', 1, 1),
('빅토리아20190824453rfedfsd', '2020-01-23', '2020-01-30', 'tester4', NULL, NULL, NULL, NULL, NULL, '로컬', 0, 0),
('빅토리아20190824sdfsfs', '2020-01-18', '2020-01-18', 'tester4', NULL, NULL, NULL, NULL, NULL, '로컬', 0, 0);

-- --------------------------------------------------------

--
-- Table structure for table `tour_additionalnote`
--

DROP TABLE IF EXISTS `tour_additionalnote`;
CREATE TABLE IF NOT EXISTS `tour_additionalnote` (
  `tourcode` varchar(250) CHARACTER SET utf8 NOT NULL,
  `note` varchar(250) CHARACTER SET utf8 DEFAULT NULL,
  PRIMARY KEY (`tourcode`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Dumping data for table `tour_additionalnote`
--

INSERT INTO `tour_additionalnote` (`tourcode`, `note`) VALUES
('TESTTOUR123456789', '테스트 비고'),
('ROCKY987654321', 'test');

-- --------------------------------------------------------

--
-- Table structure for table `tour_admission`
--

DROP TABLE IF EXISTS `tour_admission`;
CREATE TABLE IF NOT EXISTS `tour_admission` (
  `tourcode` varchar(250) NOT NULL,
  `id` int(11) NOT NULL,
  `admissionid` int(11) DEFAULT NULL,
  `admissionpaytype` varchar(250) DEFAULT NULL,
  `admissionnumpax` int(11) DEFAULT NULL,
  `admissionamount` double DEFAULT NULL,
  `admissiondate` date DEFAULT NULL,
  PRIMARY KEY (`tourcode`,`id`),
  KEY `admissionid` (`admissionid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `tour_admission`
--

INSERT INTO `tour_admission` (`tourcode`, `id`, `admissionid`, `admissionpaytype`, `admissionnumpax`, `admissionamount`, `admissiondate`) VALUES
('ROCKY123987654', 1, 25, '회사카드', 10, 100, NULL),
('ROCKY123987654', 2, 26, '회사카드', 20, 200, NULL),
('ROCKY987654321', 1, 25, '가이드페이', 10, 100, '2020-08-06'),
('ROCKY987654321', 2, 26, NULL, 20, 200, '2020-08-07'),
('ROCKY987654321', 3, 28, '가이드페이', NULL, 300, '2020-08-10'),
('TESTTOUR123456789', 1, 25, '회사카드', 10, 100, '2019-08-06'),
('TESTTOUR123456789', 2, 26, '회사체크', 20, 200, '2019-08-06'),
('TESTTOUR123456789', 3, 28, '가이드페이', 30, 300, '2019-08-06'),
('TESTTOUR123456789', 4, 25, 'Reimbersement', 40, 400, '2019-08-06'),
('빅토리아20190824', 1, 25, '가이드페이', 10, 100, NULL),
('빅토리아20190824', 2, 26, '회사체크', 20, 200, NULL),
('빅토리아20190824', 3, 28, '가이드페이', 30, 300, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `tour_carrental`
--

DROP TABLE IF EXISTS `tour_carrental`;
CREATE TABLE IF NOT EXISTS `tour_carrental` (
  `tourcode` varchar(250) NOT NULL,
  `id` int(11) NOT NULL,
  `carcompanyid` int(11) DEFAULT NULL,
  `cartypeid` int(11) DEFAULT NULL,
  `carrentalstartdate` date DEFAULT NULL,
  `carrentalenddate` date DEFAULT NULL,
  `carrentalpaytype` varchar(250) DEFAULT NULL,
  `carrentalamount` double DEFAULT NULL,
  PRIMARY KEY (`tourcode`,`id`),
  KEY `carcompanyid` (`carcompanyid`),
  KEY `cartypeid` (`cartypeid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `tour_carrental`
--

INSERT INTO `tour_carrental` (`tourcode`, `id`, `carcompanyid`, `cartypeid`, `carrentalstartdate`, `carrentalenddate`, `carrentalpaytype`, `carrentalamount`) VALUES
('ROCKY123987654', 1, 24, 32, NULL, NULL, '회사체크', 100),
('ROCKY123987654', 2, 25, 33, NULL, NULL, '가이드페이', 200),
('ROCKY987654321', 1, 24, 32, '2020-08-20', '2020-08-22', '가이드페이', 100),
('ROCKY987654321', 2, 25, 33, '2020-08-22', NULL, NULL, 200),
('TESTTOUR123456789', 1, 24, 32, '2019-08-06', '2019-08-10', '가이드페이', 100),
('TESTTOUR123456789', 2, 25, 33, '2019-08-06', '2019-08-10', '회사체크', 200),
('빅토리아20190824', 1, 24, 32, NULL, NULL, '회사카드', 100),
('빅토리아20190824', 2, 24, NULL, NULL, NULL, '가이드페이', 200);

-- --------------------------------------------------------

--
-- Table structure for table `tour_honeybeef`
--

DROP TABLE IF EXISTS `tour_honeybeef`;
CREATE TABLE IF NOT EXISTS `tour_honeybeef` (
  `tourcode` varchar(250) NOT NULL,
  `id` int(11) NOT NULL,
  `honeybeefid` int(11) DEFAULT NULL,
  `hbsalesnum` int(11) DEFAULT NULL,
  `hbsalesprice` double DEFAULT NULL,
  `hboriginalprice` double DEFAULT NULL,
  `hbcompanyprofit` double DEFAULT NULL,
  `hbguideprofit` double DEFAULT NULL,
  `hbguidecomm` int(11) DEFAULT NULL,
  `hbtcprofit` double DEFAULT NULL,
  PRIMARY KEY (`tourcode`,`id`),
  KEY `honeybeefid` (`honeybeefid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `tour_honeybeef`
--

INSERT INTO `tour_honeybeef` (`tourcode`, `id`, `honeybeefid`, `hbsalesnum`, `hbsalesprice`, `hboriginalprice`, `hbcompanyprofit`, `hbguideprofit`, `hbguidecomm`, `hbtcprofit`) VALUES
('ROCKY987654321', 1, 1, 10, 100, 10, 58.8, 25.2, 3, 6),
('ROCKY987654321', 2, 2, 20, 200, 20, 100.8, 67.2, 4, 12),
('TESTTOUR123456789', 1, 1, 10, 100, 10, 58.8, 25.2, 3, 6),
('TESTTOUR123456789', 2, 2, 20, 200, 20, 134.4, 33.6, 2, 12),
('빅토리아20190824', 1, 1, 10, 100, 10, 63, 27, 3, 0),
('빅토리아20190824', 2, 2, 20, 200, 20, 144, 36, 2, 0);

-- --------------------------------------------------------

--
-- Table structure for table `tour_hotel`
--

DROP TABLE IF EXISTS `tour_hotel`;
CREATE TABLE IF NOT EXISTS `tour_hotel` (
  `tourcode` varchar(250) NOT NULL,
  `id` int(11) NOT NULL,
  `hotelid` int(11) DEFAULT NULL,
  `hotelcheckindate` date DEFAULT NULL,
  `hotelcheckoutdate` date DEFAULT NULL,
  `hotelpaytype` varchar(250) DEFAULT NULL,
  `hotelnumroom` int(11) DEFAULT NULL,
  `hotelamount` double DEFAULT NULL,
  PRIMARY KEY (`tourcode`,`id`),
  KEY `hotelid` (`hotelid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `tour_hotel`
--

INSERT INTO `tour_hotel` (`tourcode`, `id`, `hotelid`, `hotelcheckindate`, `hotelcheckoutdate`, `hotelpaytype`, `hotelnumroom`, `hotelamount`) VALUES
('ROCKY123987654', 1, 30, NULL, NULL, '회사카드', 10, 100),
('ROCKY123987654', 2, 31, NULL, NULL, '회사체크', 20, 200),
('ROCKY987654321', 1, 30, '2020-08-20', '2020-08-22', '가이드페이', 10, 100),
('ROCKY987654321', 2, 31, '2020-08-22', '2020-08-24', '가이드페이', 20, 200),
('ROCKY987654321', 3, 31, '2020-08-22', '2020-08-23', '가이드페이', 30, 300),
('TESTTOUR123456789', 1, 30, '2019-08-06', '2019-08-10', '회사카드', 10, 100),
('TESTTOUR123456789', 2, 31, '2019-08-06', '2019-08-10', '회사체크', 20, 200),
('TESTTOUR123456789', 3, 30, '2019-08-06', '2019-08-10', '가이드페이', 30, 300),
('빅토리아20190824', 1, 30, '2019-08-06', '2019-08-08', '회사카드', 10, 100);

-- --------------------------------------------------------

--
-- Table structure for table `tour_inboundtip`
--

DROP TABLE IF EXISTS `tour_inboundtip`;
CREATE TABLE IF NOT EXISTS `tour_inboundtip` (
  `tourcode` varchar(250) CHARACTER SET utf8 NOT NULL,
  `id` int(11) NOT NULL,
  `numpax` int(11) DEFAULT NULL,
  `tipamount` double DEFAULT NULL,
  `desc` varchar(250) CHARACTER SET utf8 DEFAULT NULL,
  PRIMARY KEY (`tourcode`,`id`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Dumping data for table `tour_inboundtip`
--

INSERT INTO `tour_inboundtip` (`tourcode`, `id`, `numpax`, `tipamount`, `desc`) VALUES
('TESTTOUR123456789', 1, NULL, NULL, NULL),
('ROCKY987654321', 1, NULL, NULL, NULL),
('빅토리아20190824', 1, NULL, NULL, NULL),
('ROCKY123987654', 1, NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `tour_localtip`
--

DROP TABLE IF EXISTS `tour_localtip`;
CREATE TABLE IF NOT EXISTS `tour_localtip` (
  `tourcode` varchar(250) NOT NULL,
  `id` int(11) NOT NULL,
  `numpax` int(11) DEFAULT NULL,
  `tipamount` double DEFAULT NULL,
  `desc` varchar(250) DEFAULT NULL,
  PRIMARY KEY (`tourcode`,`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

--
-- Dumping data for table `tour_localtip`
--

INSERT INTO `tour_localtip` (`tourcode`, `id`, `numpax`, `tipamount`, `desc`) VALUES
('TESTTOUR123456789', 1, NULL, NULL, NULL),
('ROCKY987654321', 1, NULL, NULL, NULL),
('빅토리아20190824', 1, NULL, NULL, NULL),
('ROCKY123987654', 1, NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `tour_minusfactor`
--

DROP TABLE IF EXISTS `tour_minusfactor`;
CREATE TABLE IF NOT EXISTS `tour_minusfactor` (
  `tourcode` varchar(250) CHARACTER SET utf8 NOT NULL,
  `id` int(11) NOT NULL,
  `categoryid` varchar(250) CHARACTER SET utf8 NOT NULL,
  `amount` double DEFAULT NULL,
  `desc` varchar(250) CHARACTER SET utf8 DEFAULT NULL,
  PRIMARY KEY (`tourcode`,`id`),
  KEY `categoryid` (`categoryid`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Dumping data for table `tour_minusfactor`
--

INSERT INTO `tour_minusfactor` (`tourcode`, `id`, `categoryid`, `amount`, `desc`) VALUES
('TESTTOUR123456789', 2, '2', 200, '옵션포함의 경우 옵션비용'),
('TESTTOUR123456789', 1, '1', 100, '회사가 수금한 가이드 팁'),
('TESTTOUR123456789', 3, '3', 300, '기타 입금'),
('TESTTOUR123456789', 4, '3', 400, '기타 입금2'),
('ROCKY987654321', 1, '1', 100, 'svsdrfe'),
('ROCKY987654321', 2, '2', 200, 'dsfewrfds'),
('ROCKY987654321', 3, '3', 300, 'sdfsd'),
('ROCKY987654321', 4, '3', 400, 'dfsdsf'),
('ROCKY987654321', 5, '3', 500, 'dvsvsdf'),
('빅토리아20190824', 1, '1', 100, NULL),
('빅토리아20190824', 2, '2', 200, NULL),
('ROCKY123987654', 1, '1', 100, NULL),
('ROCKY123987654', 2, '2', 200, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `tour_misexpense`
--

DROP TABLE IF EXISTS `tour_misexpense`;
CREATE TABLE IF NOT EXISTS `tour_misexpense` (
  `tourcode` varchar(250) NOT NULL,
  `id` int(11) NOT NULL,
  `misexpenseid` int(11) NOT NULL,
  `misexpensepaytype` varchar(250) DEFAULT NULL,
  `misexpensedesp` varchar(250) DEFAULT NULL,
  `misexpenseamount` double DEFAULT NULL,
  PRIMARY KEY (`tourcode`,`misexpenseid`,`id`),
  KEY `misexpenseid` (`misexpenseid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `tour_misexpense`
--

INSERT INTO `tour_misexpense` (`tourcode`, `id`, `misexpenseid`, `misexpensepaytype`, `misexpensedesp`, `misexpenseamount`) VALUES
('ROCKY123987654', 1, 1, NULL, NULL, 100),
('ROCKY123987654', 2, 2, NULL, NULL, 200),
('ROCKY123987654', 3, 3, NULL, NULL, 300),
('ROCKY123987654', 4, 4, NULL, NULL, 400),
('ROCKY123987654', 5, 5, NULL, NULL, NULL),
('ROCKY987654321', 1, 1, '가이드페이', NULL, 100),
('ROCKY987654321', 2, 2, '회사체크', NULL, 200),
('ROCKY987654321', 3, 3, '가이드페이', NULL, 300),
('ROCKY987654321', 4, 4, '가이드페이', NULL, 400),
('ROCKY987654321', 5, 5, '가이드페이', NULL, 500),
('ROCKY987654321', 6, 6, '회사카드', NULL, 600),
('ROCKY987654321', 7, 6, '가이드페이', NULL, 700),
('ROCKY987654321', 8, 6, '회사카드', NULL, 800),
('TESTTOUR123456789', 1, 1, '회사카드', '주차비용', 100),
('TESTTOUR123456789', 2, 2, '회사체크', '가스비', 200),
('TESTTOUR123456789', 3, 3, '가이드페이', '가이드 지급비', 300),
('TESTTOUR123456789', 4, 4, 'Reimbersement', '픽업비용', 400),
('TESTTOUR123456789', 5, 5, '회사카드', '별도 지급  차량비', 500),
('TESTTOUR123456789', 6, 6, '회사카드', '기타1', 600),
('TESTTOUR123456789', 7, 6, '회사체크', '기타2', 700),
('빅토리아20190824', 1, 1, NULL, NULL, 100),
('빅토리아20190824', 2, 2, NULL, NULL, 200),
('빅토리아20190824', 3, 3, NULL, NULL, 300),
('빅토리아20190824', 4, 4, NULL, NULL, 400),
('빅토리아20190824', 5, 5, '회사카드', NULL, 500);

-- --------------------------------------------------------

--
-- Table structure for table `tour_option`
--

DROP TABLE IF EXISTS `tour_option`;
CREATE TABLE IF NOT EXISTS `tour_option` (
  `tourcode` varchar(250) NOT NULL,
  `id` int(11) NOT NULL,
  `optionid` int(11) DEFAULT NULL,
  `salesprice` double DEFAULT NULL,
  `originalprice` double DEFAULT NULL,
  `misc` varchar(250) DEFAULT NULL,
  `companyprofit` double DEFAULT NULL,
  `guideprofit` double DEFAULT NULL,
  `tcprofit` double DEFAULT NULL,
  `guidecom` int(11) DEFAULT NULL,
  PRIMARY KEY (`tourcode`,`id`),
  KEY `optionid` (`optionid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `tour_option`
--

INSERT INTO `tour_option` (`tourcode`, `id`, `optionid`, `salesprice`, `originalprice`, `misc`, `companyprofit`, `guideprofit`, `tcprofit`, `guidecom`) VALUES
('ROCKY123987654', 1, 25, 100, 10, NULL, 72, 18, 0, 2),
('ROCKY987654321', 1, 25, 100, 10, NULL, 58.8, 25.2, 6, 3),
('ROCKY987654321', 2, 26, 200, 20, NULL, 100.8, 67.2, 12, 4),
('TESTTOUR123456789', 1, 25, 100, 10, '옵션1', 58.8, 25.2, 6, 3),
('TESTTOUR123456789', 2, 26, 200, 20, '옵션2', 134.4, 33.6, 12, 2),
('TESTTOUR123456789', 3, 28, 300, 30, '옵션3', 151.2, 100.8, 18, 4),
('빅토리아20190824', 1, 25, 100, 10, NULL, 72, 18, 0, 2),
('빅토리아20190824', 2, 26, 200, 20, NULL, 144, 36, 0, 2),
('빅토리아20190824', 3, 28, 300, 30, NULL, 216, 54, 0, 2),
('빅토리아20190824', 4, 25, 400, 40, NULL, 288, 72, 0, 2);

-- --------------------------------------------------------

--
-- Table structure for table `tour_plusfactor`
--

DROP TABLE IF EXISTS `tour_plusfactor`;
CREATE TABLE IF NOT EXISTS `tour_plusfactor` (
  `tourcode` varchar(250) NOT NULL,
  `id` int(11) NOT NULL,
  `categoryid` varchar(250) NOT NULL,
  `amount` double DEFAULT NULL,
  `desc` varchar(250) DEFAULT NULL,
  PRIMARY KEY (`tourcode`,`id`),
  KEY `categoryid` (`categoryid`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

--
-- Dumping data for table `tour_plusfactor`
--

INSERT INTO `tour_plusfactor` (`tourcode`, `id`, `categoryid`, `amount`, `desc`) VALUES
('TESTTOUR123456789', 6, '6', 600, '꿀 수령의 원기분'),
('TESTTOUR123456789', 5, '5', 500, '옵션카드 수표 지급액'),
('TESTTOUR123456789', 4, '4', 400, '가이드 입금비'),
('TESTTOUR123456789', 3, '3', 300, '쇼핑매출&가이드수금'),
('TESTTOUR123456789', 2, '2', 200, '행사비 현지수금'),
('TESTTOUR123456789', 1, '1', 100, '행사비수령'),
('TESTTOUR123456789', 7, '7', 700, '육포 수령의 원기분'),
('TESTTOUR123456789', 8, '8', 800, '가이드 팁 입금'),
('TESTTOUR123456789', 9, '8', 900, '기타입금1'),
('TESTTOUR123456789', 10, '8', 1000, '기타입금2'),
('ROCKY987654321', 1, '1', 100, 'sdfewrsdfsdresr'),
('ROCKY987654321', 2, '2', 200, 'dfdsfs'),
('ROCKY987654321', 3, '3', 300, 'sadfsf'),
('ROCKY987654321', 4, '4', 400, 'dsfsdvdsf'),
('ROCKY987654321', 5, '5', 500, 'dsfsdfsdf'),
('ROCKY987654321', 6, '6', 600, 'dsfsvdf'),
('ROCKY987654321', 7, '7', 700, 'dsfewfe'),
('ROCKY987654321', 8, '8', 800, 'dsvsdtr'),
('ROCKY987654321', 9, '8', 900, 'sfsd'),
('ROCKY987654321', 10, '8', 1000, 'sdfdsf'),
('빅토리아20190824', 1, '1', 100, NULL),
('빅토리아20190824', 2, '2', 200, NULL),
('빅토리아20190824', 3, '3', 300, NULL),
('빅토리아20190824', 4, '4', 400, NULL),
('빅토리아20190824', 5, '5', 500, NULL),
('빅토리아20190824', 6, '6', 600, NULL),
('빅토리아20190824', 7, '7', 700, NULL),
('빅토리아20190824', 8, '8', 800, NULL),
('ROCKY123987654', 1, '1', 100, NULL),
('ROCKY123987654', 2, '2', 200, NULL),
('ROCKY123987654', 3, '3', 300, NULL),
('ROCKY123987654', 4, '4', 400, NULL),
('ROCKY123987654', 5, '5', 500, NULL),
('ROCKY123987654', 6, '6', 600, NULL),
('ROCKY123987654', 7, '7', 700, NULL),
('ROCKY123987654', 8, '8', 800, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `tour_restaurant`
--

DROP TABLE IF EXISTS `tour_restaurant`;
CREATE TABLE IF NOT EXISTS `tour_restaurant` (
  `tourcode` varchar(250) NOT NULL,
  `restid` int(11) DEFAULT NULL,
  `restday` varchar(250) NOT NULL,
  `restpaytype` varchar(250) DEFAULT NULL,
  `restnumpax` int(11) DEFAULT NULL,
  `restamount` double DEFAULT NULL,
  PRIMARY KEY (`tourcode`,`restday`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `tour_restaurant`
--

INSERT INTO `tour_restaurant` (`tourcode`, `restid`, `restday`, `restpaytype`, `restnumpax`, `restamount`) VALUES
('ROCKY123987654', 44, 'D1.석식', '회사체크', 20, 200),
('ROCKY123987654', 43, 'D1.중식', '회사체크', 10, 100),
('ROCKY987654321', 43, 'D1.석식', '가이드페이', 200, 200),
('ROCKY987654321', 43, 'D1.중식', '가이드페이', 100, 100),
('ROCKY987654321', 44, 'D2.석식', '가이드페이', 500, 500),
('ROCKY987654321', 43, 'D2.조식', '회사체크', 300, 300),
('ROCKY987654321', 44, 'D2.중식', '가이드페이', 400, 400),
('TESTTOUR123456789', 43, 'D1.석식', '회사카드', 20, 200),
('TESTTOUR123456789', 43, 'D1.중식', '회사카드', 10, 100),
('TESTTOUR123456789', 44, 'D2.석식', '회사체크', 50, 500),
('TESTTOUR123456789', 44, 'D2.조식', '회사체크', 30, 300),
('TESTTOUR123456789', 44, 'D2.중식', '회사체크', 40, 400),
('TESTTOUR123456789', NULL, 'D3.석식', NULL, NULL, NULL),
('TESTTOUR123456789', 43, 'D3.조식', '가이드페이', 60, 600),
('TESTTOUR123456789', NULL, 'D3.중식', NULL, NULL, NULL),
('빅토리아20190824', 43, 'D1.석식', '가이드페이', 20, 200),
('빅토리아20190824', 43, 'D1.중식', '가이드페이', 10, 100);

-- --------------------------------------------------------

--
-- Table structure for table `tour_shopping`
--

DROP TABLE IF EXISTS `tour_shopping`;
CREATE TABLE IF NOT EXISTS `tour_shopping` (
  `tourcode` varchar(250) NOT NULL,
  `id` int(11) NOT NULL,
  `shoppingid` int(11) DEFAULT NULL,
  `shoppingsalesamount` double DEFAULT NULL,
  `shoppingcommamount` double DEFAULT NULL,
  `shoppingcompanyprofit` double DEFAULT NULL,
  `shoppingguideprofit` double DEFAULT NULL,
  `shoppingtcprofit` double DEFAULT NULL,
  PRIMARY KEY (`tourcode`,`id`),
  KEY `shoppingid` (`shoppingid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `tour_shopping`
--

INSERT INTO `tour_shopping` (`tourcode`, `id`, `shoppingid`, `shoppingsalesamount`, `shoppingcommamount`, `shoppingcompanyprofit`, `shoppingguideprofit`, `shoppingtcprofit`) VALUES
('ROCKY123987654', 1, 55, 100, 10, 8, 2, 0),
('ROCKY123987654', 2, 60, 200, 60, 48, 12, 0),
('ROCKY987654321', 1, 55, 1000, 40, 32, 8, 60),
('ROCKY987654321', 2, 56, 2000, 280, 224, 56, 120),
('ROCKY987654321', 3, 60, 3000, 720, 576, 144, 180),
('TESTTOUR123456789', 1, 55, 100, 4, 3.2, 0.8, 6),
('TESTTOUR123456789', 2, 56, 200, 28, 22.4, 5.6, 12),
('TESTTOUR123456789', 3, 60, 300, 72, 57.6, 14.4, 18),
('빅토리아20190824', 1, 55, 100, 10, 8, 2, 0),
('빅토리아20190824', 2, 56, 200, 40, 32, 8, 0),
('빅토리아20190824', 3, 60, 300, 90, 72, 18, 0);

-- --------------------------------------------------------

--
-- Table structure for table `tour_tourprofit`
--

DROP TABLE IF EXISTS `tour_tourprofit`;
CREATE TABLE IF NOT EXISTS `tour_tourprofit` (
  `tourcode` varchar(250) CHARACTER SET utf8 NOT NULL,
  `amount` double DEFAULT NULL,
  PRIMARY KEY (`tourcode`)
) ENGINE=MyISAM DEFAULT CHARSET=utf16;

--
-- Dumping data for table `tour_tourprofit`
--

INSERT INTO `tour_tourprofit` (`tourcode`, `amount`) VALUES
('TESTTOUR123456789', 10000),
('ROCKY987654321', 50000),
('빅토리아20190824', 40000),
('ROCKY123987654', 3000);

-- --------------------------------------------------------

--
-- Table structure for table `tour_uploaderinfo`
--

DROP TABLE IF EXISTS `tour_uploaderinfo`;
CREATE TABLE IF NOT EXISTS `tour_uploaderinfo` (
  `tourcode` varchar(250) CHARACTER SET utf8 NOT NULL,
  `userid` varchar(250) CHARACTER SET utf8 NOT NULL,
  `addeddate` date NOT NULL,
  PRIMARY KEY (`tourcode`),
  KEY `userid` (`userid`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Dumping data for table `tour_uploaderinfo`
--

INSERT INTO `tour_uploaderinfo` (`tourcode`, `userid`, `addeddate`) VALUES
('TESTTOUR123456789', 'tester2', '2020-01-15'),
('TESTTOUR987654321', 'tester1', '2020-01-15'),
('ROCKY987654321', 'tester2', '2020-01-18'),
('빅토리아20190824', 'tester1', '2020-01-18'),
('록키TEST2019', 'tester1', '2020-01-18'),
('록키TEST20192', 'tester1', '2020-01-18'),
('ROCKY123987654', 'tester1', '2020-01-18'),
('ROCKY1234568778', 'tester1', '2020-01-18'),
('sfds324234', 'tester1', '2020-01-18'),
('sfds23424234', 'tester1', '2020-01-18'),
('록키TEST201923234', 'tester1', '2020-01-18'),
('록키TEST2019345435', 'tester1', '2020-01-18'),
('sterfsdfsdfsd', 'tester1', '2020-01-18'),
('록키TEST201916156', 'tester1', '2020-01-18'),
('빅토리아20190824sdfsfs', 'tester1', '2020-01-18'),
('sewrewr', 'tester1', '2020-01-18'),
('빅토리아20190824453rfedfsd', 'tester1', '2020-01-18');

-- --------------------------------------------------------

--
-- Table structure for table `usercode`
--

DROP TABLE IF EXISTS `usercode`;
CREATE TABLE IF NOT EXISTS `usercode` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(250) CHARACTER SET utf8 NOT NULL,
  `code` varchar(250) CHARACTER SET utf8 NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `usercode`
--

INSERT INTO `usercode` (`id`, `name`, `code`) VALUES
(1, '어드민', 'test11'),
(2, '오피스', 'test22'),
(3, '가이드', 'test33');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
CREATE TABLE IF NOT EXISTS `users` (
  `id` varchar(250) NOT NULL,
  `password` varchar(250) DEFAULT NULL,
  `name` varchar(250) DEFAULT NULL,
  `department` varchar(250) DEFAULT NULL,
  `authorization` varchar(250) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `password`, `name`, `department`, `authorization`) VALUES
('tester1', '$2y$10$LvBxQJV/QpC0k0Vw9ZsHAeLS2z6KjQbcb.KH3Bx851jCK/ceFO3Ai', '테스터', '어드민', 'tttttt'),
('tester2', '$2y$10$ARRoY75X7OMzqJobDrkxeuNNW4ctfKpkNIAmKgJsJ.3CivaS.i3wu', 'TESTER2', '오피스', 'ffffft'),
('tester3', '$2y$10$fC63y/LrS6JnPofbRcP7Ye5.jqsRlVuGSnEe31DU.50Zso819OVou', '홍길동', '가이드', 'ffffff'),
('tester4', '$2y$10$8Qws0e62H0uK05033q6urORySOtP.qmKg7CrZ9oqEyIHf/dTHtTam', 'Tester4', '가이드', 'ffffff');

--
-- Constraints for dumped tables
--

--
-- Constraints for table `tour`
--
ALTER TABLE `tour`
  ADD CONSTRAINT `tour_ibfk_1` FOREIGN KEY (`landid`) REFERENCES `land` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
