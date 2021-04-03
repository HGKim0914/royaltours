-- phpMyAdmin SQL Dump
-- version 4.8.5
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: Nov 30, 2019 at 07:19 PM
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
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=utf8;

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
) ENGINE=InnoDB AUTO_INCREMENT=32 DEFAULT CHARSET=utf8;

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
('guidetester2', 47, 20),
('guidetester2', 48, 15),
('guidetester2', 50, 15);

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
) ENGINE=InnoDB AUTO_INCREMENT=30 DEFAULT CHARSET=utf8;

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
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8;

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
) ENGINE=InnoDB AUTO_INCREMENT=25 DEFAULT CHARSET=utf8;

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
) ENGINE=InnoDB AUTO_INCREMENT=43 DEFAULT CHARSET=utf8;

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
) ENGINE=InnoDB AUTO_INCREMENT=51 DEFAULT CHARSET=utf8;

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
(1, 5);

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
(1, '어드민', 'test1'),
(2, '오피스', 'test2'),
(3, '가이드', 'test3');

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
