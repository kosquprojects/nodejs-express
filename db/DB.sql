-- MySQL dump 10.13  Distrib 8.0.26, for Win64 (x86_64)
--
-- Host: localhost    Database: db_evim_new
-- ------------------------------------------------------
-- Server version	8.0.26

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `tbl_emp`
--

DROP TABLE IF EXISTS `tbl_emp`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tbl_emp` (
  `n_emp_auto_id` int NOT NULL AUTO_INCREMENT,
  `s_emp_name` varchar(55) DEFAULT NULL,
  `s_emp_id` varchar(100) DEFAULT NULL,
  `s_designation` varchar(200) DEFAULT NULL,
  `s_office` varchar(20) DEFAULT NULL,
  `s_dept_name` varchar(100) DEFAULT NULL,
  `s_company` varchar(100) DEFAULT NULL,
  `s_location` varchar(55) DEFAULT NULL,
  `n_mobile_no` varchar(55) DEFAULT NULL,
  `s_email_id` varchar(55) DEFAULT NULL,
  `s_pass` varchar(55) DEFAULT NULL,
  `n_isadmin` int DEFAULT '1',
  `n_status` int DEFAULT '0',
  `role` varchar(45) DEFAULT NULL,
  `n_img_path` varchar(1000) DEFAULT NULL,
  PRIMARY KEY (`n_emp_auto_id`)
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbl_emp`
--

LOCK TABLES `tbl_emp` WRITE;
/*!40000 ALTER TABLE `tbl_emp` DISABLE KEYS */;
INSERT INTO `tbl_emp` VALUES (1,'Test','123','Software engineer','Apponext','IT','Apponext','Mumbai','12345678909','admin@gmail.com','123',0,1,NULL,NULL);
/*!40000 ALTER TABLE `tbl_emp` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tbl_plant`
--

DROP TABLE IF EXISTS `tbl_plant`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tbl_plant` (
  `n_plant` int NOT NULL AUTO_INCREMENT,
  `n_plant_id` int DEFAULT NULL,
  `s_plant_name` varchar(55) DEFAULT NULL,
  `s_plant_code` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`n_plant`),
  KEY `plant` (`n_plant_id`,`s_plant_name`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbl_plant`
--

LOCK TABLES `tbl_plant` WRITE;
/*!40000 ALTER TABLE `tbl_plant` DISABLE KEYS */;
INSERT INTO `tbl_plant` VALUES (1,1100,'HO','11'),(2,1101,'VASIND','11'),(4,1103,'WADA','11'),(5,1105,'GOA','11'),(6,1106,'NALAGARH','11'),(7,1114,'VAPI','11'),(8,1115,'CNI VASIND','11'),(9,1116,'ASSAM','11');
/*!40000 ALTER TABLE `tbl_plant` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Temporary view structure for view `vw_login`
--

DROP TABLE IF EXISTS `vw_login`;
/*!50001 DROP VIEW IF EXISTS `vw_login`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `vw_login` AS SELECT 
 1 AS `name`,
 1 AS `id`,
 1 AS `location`,
 1 AS `email`,
 1 AS `pass`,
 1 AS `n_img_path`,
 1 AS `role`*/;
SET character_set_client = @saved_cs_client;

--
-- Dumping events for database 'db_evim_new'
--

--
-- Dumping routines for database 'db_evim_new'
--

--
-- Final view structure for view `vw_login`
--

/*!50001 DROP VIEW IF EXISTS `vw_login`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `vw_login` AS select `tbl_emp`.`s_emp_name` AS `name`,`tbl_emp`.`s_emp_id` AS `id`,`tbl_emp`.`s_location` AS `location`,`tbl_emp`.`s_email_id` AS `email`,`tbl_emp`.`s_pass` AS `pass`,`tbl_emp`.`n_img_path` AS `n_img_path`,'emp' AS `role` from `tbl_emp` where (`tbl_emp`.`n_isadmin` = '1') union all select `tbl_emp`.`s_emp_name` AS `name`,`tbl_emp`.`s_emp_id` AS `id`,`tbl_emp`.`s_location` AS `location`,`tbl_emp`.`s_email_id` AS `email`,`tbl_emp`.`s_pass` AS `pass`,`tbl_emp`.`n_img_path` AS `n_img_path`,'admin' AS `role` from `tbl_emp` where (`tbl_emp`.`n_isadmin` = '0') union all select `tbl_emp`.`s_emp_name` AS `name`,`tbl_emp`.`s_emp_id` AS `id`,`tbl_emp`.`s_location` AS `location`,`tbl_emp`.`s_email_id` AS `email`,`tbl_emp`.`s_pass` AS `pass`,`tbl_emp`.`n_img_path` AS `n_img_path`,'suadmin' AS `role` from `tbl_emp` where (`tbl_emp`.`n_isadmin` = '2') */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-09-21  0:01:29
