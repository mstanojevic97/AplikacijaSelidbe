-- MySQL dump 10.13  Distrib 8.0.27, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: sys
-- ------------------------------------------------------
-- Server version	8.0.27

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
-- Table structure for table `narudzbina`
--

DROP TABLE IF EXISTS `narudzbina`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `narudzbina` (
  `ID` int NOT NULL AUTO_INCREMENT,
  `Lokacija` varchar(45) COLLATE utf8mb4_0900_as_ci DEFAULT NULL,
  `Opis` varchar(45) COLLATE utf8mb4_0900_as_ci DEFAULT NULL,
  `Vreme` float DEFAULT NULL,
  `Cena` float DEFAULT NULL,
  `Id_Vozila` int DEFAULT NULL,
  `Id_Korisnika` int DEFAULT NULL,
  `Id_Statusa` int DEFAULT NULL,
  `Km` float DEFAULT NULL,
  PRIMARY KEY (`ID`),
  KEY `Id_Vozila` (`Id_Vozila`),
  KEY `Id_Korisnika` (`Id_Korisnika`),
  KEY `Id_Statusa` (`Id_Statusa`),
  CONSTRAINT `narudzbina_ibfk_1` FOREIGN KEY (`Id_Vozila`) REFERENCES `vozilo` (`ID`),
  CONSTRAINT `narudzbina_ibfk_2` FOREIGN KEY (`Id_Korisnika`) REFERENCES `korisnici` (`ID`),
  CONSTRAINT `narudzbina_ibfk_3` FOREIGN KEY (`Id_Statusa`) REFERENCES `statusnarudzbine` (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=28 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_as_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `narudzbina`
--

LOCK TABLES `narudzbina` WRITE;
/*!40000 ALTER TABLE `narudzbina` DISABLE KEYS */;
INSERT INTO `narudzbina` VALUES (21,'Obilicev Trg','Velika selidba',3.33333,900,3,4,1,300),(22,'Obilicev Trg','Srednja selidba',2.5,600,2,4,1,300),(23,'Toplicina 2','Mala selidba',1.66667,200,1,2,1,200),(24,'Cara Dusana 2','Velika selidba',3.33333,900,3,2,1,300),(25,'Vladicin Han bb','Velika selidba',2.22222,600,3,6,1,200),(26,'Toplicina 2','Mala selidba',2.5,300,1,6,1,300),(27,'Obilicev Trg','Mala selidba',4.16667,500,1,6,1,500);
/*!40000 ALTER TABLE `narudzbina` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-01-04 17:46:18
