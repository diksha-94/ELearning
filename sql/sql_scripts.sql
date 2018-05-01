-- MySQL dump 10.13  Distrib 5.7.17, for Win64 (x86_64)
--
-- Host: localhost    Database: contentdb
-- ------------------------------------------------------
-- Server version	5.7.21-log

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `chapters`
--

DROP TABLE IF EXISTS `chapters`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `chapters` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `adminid` int(11) NOT NULL,
  `subjectid` int(11) NOT NULL,
  `chaptername` text NOT NULL,
  `chapterdescription` text,
  `parent` int(11) DEFAULT '-1',
  PRIMARY KEY (`id`),
  KEY `fk_adminid_chapters_idx` (`adminid`),
  KEY `fk_sbjectid_chapters_idx` (`subjectid`),
  CONSTRAINT `fk_adminid_chapters` FOREIGN KEY (`adminid`) REFERENCES `admindb`.`admindetails` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_sbjectid_chapters` FOREIGN KEY (`subjectid`) REFERENCES `subjects` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `chapters`
--

LOCK TABLES `chapters` WRITE;
/*!40000 ALTER TABLE `chapters` DISABLE KEYS */;
/*!40000 ALTER TABLE `chapters` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `content`
--

DROP TABLE IF EXISTS `content`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `content` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `adminid` int(11) NOT NULL,
  `subjectid` int(11) NOT NULL,
  `chapterid` int(11) NOT NULL,
  `htmlcontent` text NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_adminid_content_idx` (`adminid`),
  KEY `fk_subjectid_content_idx` (`subjectid`),
  KEY `fk_chapterid_content_idx` (`chapterid`),
  CONSTRAINT `fk_adminid_content` FOREIGN KEY (`adminid`) REFERENCES `admindb`.`admindetails` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_chapterid_content` FOREIGN KEY (`chapterid`) REFERENCES `chapters` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_subjectid_content` FOREIGN KEY (`subjectid`) REFERENCES `subjects` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `content`
--

LOCK TABLES `content` WRITE;
/*!40000 ALTER TABLE `content` DISABLE KEYS */;
/*!40000 ALTER TABLE `content` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `subjects`
--

DROP TABLE IF EXISTS `subjects`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `subjects` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `adminid` int(11) NOT NULL,
  `subjectname` varchar(100) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_adminid_subjects_idx` (`adminid`),
  CONSTRAINT `fk_adminid_subjects` FOREIGN KEY (`adminid`) REFERENCES `admindb`.`admindetails` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `subjects`
--

LOCK TABLES `subjects` WRITE;
/*!40000 ALTER TABLE `subjects` DISABLE KEYS */;
/*!40000 ALTER TABLE `subjects` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2018-05-01 21:31:16
-- MySQL dump 10.13  Distrib 5.7.17, for Win64 (x86_64)
--
-- Host: localhost    Database: admindb
-- ------------------------------------------------------
-- Server version	5.7.21-log

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `admindetails`
--

DROP TABLE IF EXISTS `admindetails`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `admindetails` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `schoolid` int(11) NOT NULL,
  `class` varchar(45) NOT NULL,
  `username` varchar(45) NOT NULL,
  `emailid` varchar(100) NOT NULL,
  `mobileno` text NOT NULL,
  `password` varchar(500) NOT NULL,
  `name` varchar(100) NOT NULL,
  `createdon` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedon` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `fk_sckoolid` (`schoolid`),
  CONSTRAINT `fk_sckoolid` FOREIGN KEY (`schoolid`) REFERENCES `schooldb`.`schoolcode` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `admindetails`
--

LOCK TABLES `admindetails` WRITE;
/*!40000 ALTER TABLE `admindetails` DISABLE KEYS */;
INSERT INTO `admindetails` VALUES (1,1,'10','bajaj.diksha','bajaj.diksha45@gmail.com','7206736086','qwerty','diksha','2018-05-01 20:56:49','2018-05-01 20:56:49'),(2,1,'7','bajaj.dik','bajaj.diksha45@gmail.com','7206736086','qwerty','diksha','2018-05-01 20:58:54','2018-05-01 20:58:54'),(3,2,'10','diksha.bajaj','bajaj.diksha45@gmail.com','7206736086','qwerty','diksha','2018-05-01 20:59:24','2018-05-01 20:59:24');
/*!40000 ALTER TABLE `admindetails` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2018-05-01 21:31:16
-- MySQL dump 10.13  Distrib 5.7.17, for Win64 (x86_64)
--
-- Host: localhost    Database: schooldb
-- ------------------------------------------------------
-- Server version	5.7.21-log

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `schoolcode`
--

DROP TABLE IF EXISTS `schoolcode`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `schoolcode` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `schoolname` varchar(500) NOT NULL,
  `schoolcode` varchar(45) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `schoolcode`
--

LOCK TABLES `schoolcode` WRITE;
/*!40000 ALTER TABLE `schoolcode` DISABLE KEYS */;
INSERT INTO `schoolcode` VALUES (1,'ABC Public School','560037'),(2,'XYZ Public School','560066');
/*!40000 ALTER TABLE `schoolcode` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `schooldetails`
--

DROP TABLE IF EXISTS `schooldetails`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `schooldetails` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `schoolname` varchar(500) NOT NULL,
  `schoolcode` varchar(45) NOT NULL,
  `phonenumber` text NOT NULL,
  `emailid` varchar(100) NOT NULL,
  `password` varchar(500) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `schooldetails`
--

LOCK TABLES `schooldetails` WRITE;
/*!40000 ALTER TABLE `schooldetails` DISABLE KEYS */;
INSERT INTO `schooldetails` VALUES (1,'ABC Public School','560037','7206736086','bajaj.diksha45@gmail.com','qwerty'),(2,'XYZ Public School','560066','7206736086','bajaj.diksha45@gmail.com','qwerty');
/*!40000 ALTER TABLE `schooldetails` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2018-05-01 21:31:16
-- MySQL dump 10.13  Distrib 5.7.17, for Win64 (x86_64)
--
-- Host: localhost    Database: testsdb
-- ------------------------------------------------------
-- Server version	5.7.21-log

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `questions`
--

DROP TABLE IF EXISTS `questions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `questions` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `testid` int(11) NOT NULL,
  `questiontype` varchar(45) NOT NULL,
  `paragraphtext` text,
  `questiontext` text NOT NULL,
  `optiona` text,
  `optionb` text,
  `optionc` text,
  `optiond` text,
  `correctoption` text,
  `explanation` text,
  `active` varchar(45) NOT NULL DEFAULT 'true',
  PRIMARY KEY (`id`),
  KEY `fk_testid_questions_idx` (`testid`),
  CONSTRAINT `fk_testid_questions` FOREIGN KEY (`testid`) REFERENCES `testdetails` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `questions`
--

LOCK TABLES `questions` WRITE;
/*!40000 ALTER TABLE `questions` DISABLE KEYS */;
/*!40000 ALTER TABLE `questions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `testdetails`
--

DROP TABLE IF EXISTS `testdetails`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `testdetails` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` text NOT NULL,
  `no_of_ques` int(11) NOT NULL,
  `time_limit` int(11) NOT NULL,
  `correct_ans_marks` int(11) NOT NULL,
  `wrong_ans_marks` int(11) NOT NULL,
  `passing_percentage` int(11) DEFAULT NULL,
  `shuffle_ques` tinyint(5) DEFAULT NULL,
  `shuffle_options` tinyint(5) DEFAULT NULL,
  `attempt_multiple_times` tinyint(5) DEFAULT NULL,
  `active` varchar(10) DEFAULT 'false',
  `candidate_count` int(11) NOT NULL DEFAULT '0',
  `adminid` int(11) DEFAULT NULL,
  `subjectwise` tinyint(5) DEFAULT NULL,
  `chapterwise` tinyint(5) DEFAULT NULL,
  `subjectid` int(11) DEFAULT NULL,
  `chapterid` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_adminid_testdetails_idx` (`adminid`),
  KEY `fk_subjectid_testdetails_idx` (`subjectid`),
  KEY `fk_chapterid_testdetails_idx` (`chapterid`),
  CONSTRAINT `fk_adminid_testdetails` FOREIGN KEY (`adminid`) REFERENCES `admindb`.`admindetails` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_chapterid_testdetails` FOREIGN KEY (`chapterid`) REFERENCES `contentdb`.`chapters` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_subjectid_testdetails` FOREIGN KEY (`subjectid`) REFERENCES `contentdb`.`subjects` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `testdetails`
--

LOCK TABLES `testdetails` WRITE;
/*!40000 ALTER TABLE `testdetails` DISABLE KEYS */;
/*!40000 ALTER TABLE `testdetails` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2018-05-01 21:31:17
