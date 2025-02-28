-- MySQL dump 10.13  Distrib 8.0.38, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: auth_db
-- ------------------------------------------------------
-- Server version	8.4.2

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
-- Table structure for table `comment`
--

DROP TABLE IF EXISTS `comment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `comment` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `recipe_id` int NOT NULL,
  `user_id` int NOT NULL,
  `content` text NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`),
  KEY `recipe_id` (`recipe_id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `comment_ibfk_1` FOREIGN KEY (`recipe_id`) REFERENCES `recipes` (`id`) ON DELETE CASCADE,
  CONSTRAINT `comment_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=30 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `comment`
--

LOCK TABLES `comment` WRITE;
/*!40000 ALTER TABLE `comment` DISABLE KEYS */;
INSERT INTO `comment` VALUES (2,5,14,'good','2025-02-25 23:05:27'),(3,3,14,'good','2025-02-25 23:06:32'),(4,3,13,'well','2025-02-25 23:07:46'),(5,6,14,'good','2025-02-25 23:26:40'),(6,9,14,'good','2025-02-25 23:32:25'),(7,5,14,'lajawab','2025-02-25 23:33:20'),(8,7,13,'good\n','2025-02-25 23:34:42'),(9,9,13,'well','2025-02-25 23:39:23'),(10,4,13,'good','2025-02-25 23:40:07'),(11,6,13,'well','2025-02-25 23:40:36'),(12,6,14,'good','2025-02-25 23:45:19'),(13,3,14,'good','2025-02-25 23:49:56'),(14,6,15,'fantastic\n','2025-02-25 23:51:53'),(15,7,15,'good\n','2025-02-25 23:52:22'),(16,7,15,'well','2025-02-25 23:58:06'),(17,5,15,'well','2025-02-26 00:07:24'),(18,5,15,'good','2025-02-26 00:07:30'),(19,5,15,'awesome','2025-02-26 00:07:38'),(20,5,15,'jhakas','2025-02-26 00:07:49'),(21,5,15,'bindas','2025-02-26 00:08:03'),(22,7,15,'awesome','2025-02-26 00:09:14'),(23,3,15,'good','2025-02-26 00:12:09'),(24,3,15,'awesome','2025-02-26 00:12:31'),(25,3,15,'awesome','2025-02-26 00:12:46'),(26,3,14,'awesome','2025-02-26 00:26:33'),(27,7,14,'g','2025-02-28 02:46:13'),(28,3,14,'good\n','2025-02-28 05:31:45'),(29,6,14,'good one','2025-02-28 06:02:35');
/*!40000 ALTER TABLE `comment` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `directions`
--

DROP TABLE IF EXISTS `directions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `directions` (
  `id` int NOT NULL AUTO_INCREMENT,
  `recipe_id` int DEFAULT NULL,
  `step_number` int DEFAULT NULL,
  `instruction` text NOT NULL,
  PRIMARY KEY (`id`),
  KEY `recipe_id` (`recipe_id`),
  CONSTRAINT `directions_ibfk_1` FOREIGN KEY (`recipe_id`) REFERENCES `recipes` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=47 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `directions`
--

LOCK TABLES `directions` WRITE;
/*!40000 ALTER TABLE `directions` DISABLE KEYS */;
INSERT INTO `directions` VALUES (10,3,1,'Marinate the chicken with spices and let it sit for 30 minutes.'),(11,3,2,'Heat butter in a pan, cook the chicken until golden brown.'),(12,3,3,'Add tomato puree and cook for another 10 minutes.'),(13,3,4,'Serve hot with rice or naan.'),(14,4,1,'Boil eggs and peel them.'),(15,4,2,'Sauté onions in oil until golden brown, then add tomato puree and spices.'),(16,4,3,'Add boiled eggs and simmer for 10 minutes.'),(17,4,4,'Serve hot with rice or roti'),(18,4,5,''),(19,5,1,'Boil potatoes, peel, and cut them into cubes.'),(20,5,2,'Heat oil in a pan, add mustard seeds and green chilies.'),(21,5,3,'Add the boiled potatoes and spices, stir-fry for a few minutes.'),(22,5,4,'Serve hot with puri or paratha.'),(23,5,5,''),(24,6,1,'Heat oil or butter in a pan and sauté onions until golden brown.'),(25,6,2,'Add chopped tomatoes, green chilies, and spices, cook until soft.'),(26,6,3,'Crack eggs into the pan and scramble them well.'),(27,6,4,'Cook until eggs are fully cooked, then serve hot with bread or roti.'),(28,7,1,'well'),(29,7,2,''),(32,9,1,'Marinate the Chicken: In a bowl, mix yogurt, garlic paste, ginger paste, red chili powder, garam masala, and salt. Add chicken and coat well. Marinate for at least 30 minutes (overnight is best).'),(33,9,2,'Cook the Chicken: Heat 1 tbsp butter in a pan, add the marinated chicken, and cook for 5-7 minutes until slightly charred. Remove and set aside.'),(34,9,3,'Prepare the Gravy: In the same pan, melt 2 tbsp butter, add tomato puree, and cook for 5-10 minutes until the sauce thickens.'),(35,9,4,'');
/*!40000 ALTER TABLE `directions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `feedback`
--

DROP TABLE IF EXISTS `feedback`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `feedback` (
  `id` int NOT NULL AUTO_INCREMENT,
  `email` varchar(255) NOT NULL,
  `message` text NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `feedback`
--

LOCK TABLES `feedback` WRITE;
/*!40000 ALTER TABLE `feedback` DISABLE KEYS */;
INSERT INTO `feedback` VALUES (1,'test@example.com','This is a test feedback message','2025-02-24 16:05:11'),(2,'raushan@gmail.com','hii i am good','2025-02-24 16:16:29'),(3,'raushan@gmail.com','hii you are handsome','2025-02-24 16:19:17');
/*!40000 ALTER TABLE `feedback` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ingredients`
--

DROP TABLE IF EXISTS `ingredients`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ingredients` (
  `id` int NOT NULL AUTO_INCREMENT,
  `recipe_id` int DEFAULT NULL,
  `ingredient` varchar(255) NOT NULL,
  `metric` varchar(100) DEFAULT NULL,
  `us_measure` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `recipe_id` (`recipe_id`),
  CONSTRAINT `ingredients_ibfk_1` FOREIGN KEY (`recipe_id`) REFERENCES `recipes` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=47 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ingredients`
--

LOCK TABLES `ingredients` WRITE;
/*!40000 ALTER TABLE `ingredients` DISABLE KEYS */;
INSERT INTO `ingredients` VALUES (8,3,'Chicken','500g','1 lb'),(9,3,'Butter','50g','1/4 cup'),(10,3,'Tomato Puree','200ml','3/4 cup'),(11,4,'Eggs','4','4'),(12,4,'Onion','1 large','1 large'),(13,4,'Tomato Puree','200ml','3/4 cup'),(14,4,'Spices (turmeric, chili powder, garam masala)','as needed','as needed'),(15,4,'','',''),(16,5,'Potatoes','500g','1 lb'),(17,5,'Mustard Seeds','1 tsp','1 tsp'),(18,5,'Green Chilies','2','2'),(19,5,'Spices (turmeric, chili powder, garam masala)','as needed','as needed'),(20,5,'','',''),(21,6,'Eggs','4','4'),(22,6,'Onion','1 medium','1 medium'),(23,6,'Tomato','1 medium','1 medium'),(24,6,'Green Chilies','2','2'),(25,6,'Spices (turmeric, chili powder, cumin)','as needed','as needed'),(26,6,'Butter or Oil','1 tbsp','1 tbsp'),(27,7,'Eggs','4','4'),(28,7,'','',''),(31,9,'Yogurt','250g','1 cup'),(32,9,'Garlic paste','1 tbsp','1 tsp'),(33,9,'Kasuri methi (dried fenugreek leaves)','1 tsp','1 tsp'),(34,9,'','','');
/*!40000 ALTER TABLE `ingredients` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `recipes`
--

DROP TABLE IF EXISTS `recipes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `recipes` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `image` text,
  `description` text NOT NULL,
  `servings` int DEFAULT NULL,
  `prep_time` varchar(50) DEFAULT NULL,
  `cook_time` varchar(50) DEFAULT NULL,
  `ready_time` varchar(50) DEFAULT NULL,
  `category` varchar(100) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `user_id` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_user` (`user_id`),
  CONSTRAINT `fk_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `recipes`
--

LOCK TABLES `recipes` WRITE;
/*!40000 ALTER TABLE `recipes` DISABLE KEYS */;
INSERT INTO `recipes` VALUES (3,'Samosa','https://static.toiimg.com/thumb/61050397.cms?width=1200&height=900','A delicious North Indian dish made with creamy tomato sauce.',4,'15 min','30 min','45 min','North Indian','2025-02-25 04:56:08',1),(4,'Egg Curry','https://www.spicebangla.com/wp-content/uploads/2024/08/Egg-Masala-Curry.webp','A flavorful North Indian dish with boiled eggs in a rich tomato-based curry.',4,'10 mins','25 mins','35 mins','North Indian','2025-02-25 05:32:20',1),(5,'Aloo Masala','https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRzFAuLck6RI7MwQYsCLSQ3taqGfpWI3yA4Ow&s','A delicious and spicy potato dish made with aromatic Indian spices.',4,'15 mins','20 mins','35 mins','North Indian','2025-02-25 05:35:15',1),(6,'Spicy Egg Bhurji','https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS8CGdopC-U14F_GyqLOCWJh8Bp-dAiIubR6w&s','A quick and delicious Indian-style scrambled egg dish packed with spices and flavor.',2,'10 min','10 min','20 min','North Indian','2025-02-25 05:40:14',1),(7,'Egg Curry Masala','https://www.spicebangla.com/wp-content/uploads/2024/08/Egg-Masala-Curry.webp','good',4,'10 mins','25 mins','35 mins','North Indian','2025-02-25 07:45:13',1),(9,'Butter Chicken','https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQN2jh7DvoLtDyDF6cigDHFrSMs5zMpaXRelA&s','A rich, creamy, and flavorful North Indian dish made with marinated chicken cooked in a spiced tomato-based gravy.',4,'15 mins','30 mins','45 mins','Central Indian','2025-02-25 08:55:23',13);
/*!40000 ALTER TABLE `recipes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `saved_recipes`
--

DROP TABLE IF EXISTS `saved_recipes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `saved_recipes` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `recipe_id` int NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  KEY `recipe_id` (`recipe_id`),
  CONSTRAINT `saved_recipes_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  CONSTRAINT `saved_recipes_ibfk_2` FOREIGN KEY (`recipe_id`) REFERENCES `recipes` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `saved_recipes`
--

LOCK TABLES `saved_recipes` WRITE;
/*!40000 ALTER TABLE `saved_recipes` DISABLE KEYS */;
INSERT INTO `saved_recipes` VALUES (1,13,9,'2025-02-25 10:25:04'),(2,2,9,'2025-02-25 10:26:05'),(3,2,7,'2025-02-25 10:40:00'),(4,2,6,'2025-02-25 10:40:06'),(5,2,3,'2025-02-25 10:58:47'),(6,13,3,'2025-02-25 11:46:25'),(8,13,7,'2025-02-25 11:49:54'),(9,13,4,'2025-02-25 11:56:41'),(10,13,6,'2025-02-25 12:11:00'),(12,14,7,'2025-02-25 12:21:04'),(13,14,6,'2025-02-25 12:21:06'),(14,14,3,'2025-02-25 13:11:25'),(15,15,3,'2025-02-26 05:20:52'),(16,15,6,'2025-02-26 05:20:56'),(17,14,9,'2025-02-26 06:24:22'),(18,15,4,'2025-02-26 06:29:21'),(19,14,5,'2025-02-28 11:32:13');
/*!40000 ALTER TABLE `saved_recipes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(50) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password_hash` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'shyami','raushanmansagar12345@gmail.com','$2b$12$zfLVbs.PO6Mgyr5jwJhJqOkTto.RXqwCAv5zKHLPzIXEuGnke/B.C'),(2,'pragyaaastha','raushani@gmail.com','$2b$12$dFXkCEzH8e4sXHu.3cUfh.05r2BXR6teLi3LgwnR9adnQmgUHqCoe'),(3,'admin','admin@example.com','$2b$12$WJ7YDQ2Xbhg0E.TmxV37a.NGoSsdzaBMrHIr4i265Yyko/oJQ2Spy'),(4,'shyamu','raushanmansagar1234567@gmail.com','$2b$12$/Ofe8Zkq4xQ6EsB/FfTBKuPN9GyGij8QB52XXeeHq504vtKcT7ZIO'),(5,'john_doe','john@example.com','$2b$12$4jidZk40yWiFc7VK5anohe1VKKpZCB0jrkK1gJDO4JYuoH3AZHTOS'),(7,'raushani','pragyaastha3@gmail.com','$2b$12$iEF9pIay1BCNyGQOAvHAwuhyh0ydrVLOj.oBgMwXAUUGZvgAxA8HW'),(8,'raj','john@examples.com','$2b$12$KDWEb.tw9MEyH3fayKQsZOed02HklVWd0tMauBNdqecM8z2FPSVVi'),(10,'rajnish','john@exampless.com','$2b$12$z1oQhJBudkrfFX0.2ZpXc.uNT5c1RujKOO/WwbfFTTLdrEyvyskj2'),(11,'raju','john@examplessd.com','$2b$12$jkb9x7yVgv9dAA6gt6PVD.Ru2H0bH.9ck6OtKXuYA1nE.yGUOQQMa'),(12,'Raushan kumari','raushanmansagar123456@gmail.com','$2b$12$w3FKP1XWM7BxNp3ZSjJA7uMErxSEVjkTfrGnDonZ14ReD8uf2XG5y'),(13,'raushan raj','mamta@gmail.com','$2b$12$xZubwkkI.PxUG1/MIyo1huz54y18hVwXoQOb7qSBUpQD11laz4q9.'),(14,'stylo raushan','stylo@gmail.com','$2b$12$vpQ3MkaGm8oA4fJM.A8N4e6NLQcjgYLf82cDeYPbCD75dp1UcZQzG'),(15,'puja','puja@gmail.com','$2b$12$BeFymo/nxoUsIHpQ0hY6Ku/9sP0xjXSdbOTCP4Fu3FbPE8xYUo8i2');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-02-28 17:24:49
