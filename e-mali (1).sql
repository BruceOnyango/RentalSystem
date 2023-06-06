-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jan 24, 2023 at 01:59 PM
-- Server version: 10.4.20-MariaDB
-- PHP Version: 8.0.8

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `e-mali`
--

-- --------------------------------------------------------

--
-- Table structure for table `enquiry`
--

CREATE TABLE `enquiry` (
  `enquiry_id` int(10) NOT NULL,
  `user_id` int(10) NOT NULL,
  `property_id` int(10) NOT NULL,
  `e_message` longtext NOT NULL,
  `creation_time` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `enquiry`
--

INSERT INTO `enquiry` (`enquiry_id`, `user_id`, `property_id`, `e_message`, `creation_time`) VALUES
(1, 1, 1, 'jeremy', '2023-01-22 10:17:53'),
(2, 1, 2, 'Is this still available?', '2023-01-22 10:17:53'),
(3, 1, 2, 'asas', '2023-01-22 10:17:53'),
(4, 1, 1, 'hello sir', '2023-01-22 10:17:53'),
(5, 6, 4, 'hey sir', '2023-01-22 10:17:53'),
(6, 6, 4, 'How much?', '2023-01-22 16:16:02'),
(7, 6, 4, 'How much', '2023-01-22 16:38:51'),
(8, 1, 1, 'When Can I purchas e then?', '2023-01-23 13:12:32'),
(9, 1, 1, 'hellod', '2023-01-23 19:37:11');

-- --------------------------------------------------------

--
-- Table structure for table `feedback`
--

CREATE TABLE `feedback` (
  `feedback_id` int(11) NOT NULL,
  `enquiry_id` int(11) NOT NULL,
  `f_message` longtext NOT NULL,
  `creation_time` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `feedback`
--

INSERT INTO `feedback` (`feedback_id`, `enquiry_id`, `f_message`, `creation_time`) VALUES
(1, 2, 'Yes sit it is.', '2023-01-22 10:18:34'),
(2, 1, 'i am agent.', '2023-01-22 10:18:34'),
(3, 3, 'sass', '2023-01-22 10:18:34'),
(4, 1, 'yes sir', '2023-01-22 10:18:34'),
(5, 2, 'yes', '2023-01-22 10:18:34'),
(6, 5, 'Still there sir?', '2023-01-22 16:11:11'),
(7, 5, '220 Dirhams', '2023-01-22 16:39:36'),
(8, 1, 'here sir', '2023-01-23 23:47:23');

-- --------------------------------------------------------

--
-- Table structure for table `process`
--

CREATE TABLE `process` (
  `process_id` int(11) NOT NULL,
  `property_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `transfer` varchar(10) NOT NULL DEFAULT 'no',
  `search` enum('Begin','Terminate','Success','Progress') NOT NULL DEFAULT 'Begin'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `process`
--

INSERT INTO `process` (`process_id`, `property_id`, `user_id`, `transfer`, `search`) VALUES
(4, 2, 1, 'yes', 'Success'),
(5, 1, 1, 'no', 'Progress');

-- --------------------------------------------------------

--
-- Table structure for table `property`
--

CREATE TABLE `property` (
  `property_id` int(10) NOT NULL,
  `user_id` varchar(20) NOT NULL,
  `property_name` varchar(50) NOT NULL,
  `address` varchar(100) NOT NULL,
  `price` int(10) NOT NULL,
  `type` varchar(10) NOT NULL DEFAULT 'house',
  `offer` varchar(10) NOT NULL DEFAULT 'sale',
  `status` varchar(50) NOT NULL DEFAULT 'ready to move',
  `furnished` varchar(50) NOT NULL DEFAULT 'furnished',
  `carpet_area` int(10) NOT NULL DEFAULT 0,
  `age` int(10) NOT NULL DEFAULT 0,
  `total_floors` int(10) NOT NULL DEFAULT 1,
  `deposite` int(10) NOT NULL,
  `bedroom` varchar(10) NOT NULL DEFAULT '1',
  `bathroom` varchar(10) NOT NULL DEFAULT '1',
  `balcony` varchar(10) NOT NULL DEFAULT '1',
  `lift` varchar(3) NOT NULL DEFAULT 'no',
  `security_guard` varchar(3) NOT NULL DEFAULT 'no',
  `play_ground` varchar(3) NOT NULL DEFAULT 'no',
  `garden` varchar(3) NOT NULL DEFAULT 'no',
  `water_supply` varchar(3) NOT NULL DEFAULT 'no',
  `power_backup` varchar(3) NOT NULL DEFAULT 'no',
  `parking_area` varchar(3) NOT NULL DEFAULT 'no',
  `gym` varchar(3) NOT NULL DEFAULT 'no',
  `shopping_mall` varchar(3) NOT NULL DEFAULT 'no',
  `hospital` varchar(3) NOT NULL DEFAULT 'no',
  `school` varchar(3) NOT NULL DEFAULT 'no',
  `market_area` varchar(3) NOT NULL DEFAULT 'no',
  `image_01` varchar(50) NOT NULL DEFAULT 'CU096uVpX5jB7Lwip9vn.jpg',
  `image_02` varchar(50) NOT NULL DEFAULT 'CU096uVpX5jB7Lwip9vn.jpg',
  `image_03` varchar(50) NOT NULL DEFAULT 'wRmKHuL3mxhsYQqi9ILe.jpg',
  `image_04` varchar(50) NOT NULL DEFAULT 'CU096uVpX5jB7Lwip9vn.jpg',
  `image_05` varchar(50) NOT NULL DEFAULT 'CU096uVpX5jB7Lwip9vn.jpg',
  `image_06` varchar(50) NOT NULL DEFAULT 'CU096uVpX5jB7Lwip9vn.jpg',
  `description` varchar(1000) NOT NULL,
  `creation_time` datetime DEFAULT current_timestamp(),
  `modification_time` datetime DEFAULT NULL ON UPDATE current_timestamp(),
  `valuated` enum('Approved','Pending Payment','Pending Approval','Declined') NOT NULL DEFAULT 'Pending Payment'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `property`
--

INSERT INTO `property` (`property_id`, `user_id`, `property_name`, `address`, `price`, `type`, `offer`, `status`, `furnished`, `carpet_area`, `age`, `total_floors`, `deposite`, `bedroom`, `bathroom`, `balcony`, `lift`, `security_guard`, `play_ground`, `garden`, `water_supply`, `power_backup`, `parking_area`, `gym`, `shopping_mall`, `hospital`, `school`, `market_area`, `image_01`, `image_02`, `image_03`, `image_04`, `image_05`, `image_06`, `description`, `creation_time`, `modification_time`, `valuated`) VALUES
(1, '2', 'house for sale in karen', 'karen, karen blixen ,kenya', 20000000, 'house', 'sale', 'ready to move', 'furnished', 0, 0, 0, 850000, '4', '4', '4', 'no', 'no', 'yes', 'no', 'yes', 'no', 'no', 'yes', 'yes', 'no', 'no', 'no', 'CU096uVpX5jB7Lwip9vn.jpg', '99Xzs3ziOBJsTMZ4cUWb.jpg', '0d3XGz9ARzIgnT82mVp2.jpg', 'CU096uVpX5jB7Lwip9vn.jpg', 'CU096uVpX5jB7Lwip9vn.jpg', 'CU096uVpX5jB7Lwip9vn.jpg', 'This property will have you feeling as if you were in the mountains! Your monthly rent already covers power, water, sewer and trash so all you need to do is move in! Washer and dryer are already in house.', '2022-12-08 00:00:00', '2023-01-20 15:34:17', 'Approved'),
(2, '2', 'Kileleshwa homes', 'kileshwa , nairobi', 6000000, 'house', 'sale', 'ready to move', 'furnished', 12, 12, 28, 450000, '3', '3', '3', 'no', 'no', 'no', 'no', 'no', 'no', 'no', 'no', 'no', 'no', 'no', 'no', '8UomVRRQ2NVnijZiMgOD.jpg', 'fpQAIinV3npCXnqOOkBL.jpg', 'XlVijyVL12eZnLncqSiN.jpg', 'CU096uVpX5jB7Lwip9vn.jpg', 'CU096uVpX5jB7Lwip9vn.jpg', 'CU096uVpX5jB7Lwip9vn.jpg', 'This property will have you feeling as if you were in the mountains! Your monthly rent already covers power, water, sewer and trash so all you need to do is move in! Washer and dryer are already in house', '2022-12-09 00:00:00', '2023-01-22 08:19:02', 'Approved'),
(3, '2', 'Kileleshwa', 'kileshwa , nairobi', 6000000, 'house', 'sale', 'ready to move', 'furnished', 0, 0, 0, 450000, '3', '3', '3', 'no', 'no', 'yes', 'no', 'yes', 'yes', 'yes', 'no', 'no', 'no', 'no', 'no', 'rirJz63SwvMGKStC8Q0P.jpg', 'pgyotleRBVX4SEjQBZud.jpg', 'wRmKHuL3mxhsYQqi9ILe.jpg', 'CU096uVpX5jB7Lwip9vn.jpg', 'CU096uVpX5jB7Lwip9vn.jpg', 'CU096uVpX5jB7Lwip9vn.jpg', 'This property will have you feeling as if you were in the mountains! Your monthly rent already covers power, water, sewer and trash so all you need to do is move in! Washer and dryer are already in house', '2022-12-09 00:00:00', '2023-01-22 09:24:03', 'Approved'),
(4, '2', 'house for sale in langÃ¡ta', 'lang&#39;ata&#39;, nairobi', 15000000, 'house', 'sale', 'ready to move', 'unfurnished', 0, 0, 0, 1500000, '4', '3', '1', 'no', 'yes', 'no', 'yes', 'yes', 'yes', 'yes', 'no', 'no', 'no', 'no', 'no', 'EuGVsQ5q4ZePEPSOi0Oo.jpg', 'FHTTEkr1qfCGCo485qXA.jpg', '0d3XGz9ARzIgnT82mVp2.jpg', 'CU096uVpX5jB7Lwip9vn.jpg', 'CU096uVpX5jB7Lwip9vn.jpg', 'CU096uVpX5jB7Lwip9vn.jpg', 'This property will have you feeling as if you were in the mountains! Your monthly rent already covers power, water, sewer and trash so all you need to do is move in! Washer and dryer are already in house', '2022-12-09 00:00:00', '2023-01-22 09:25:43', 'Approved'),
(5, '2', 'house for sale in kilimani', 'lang&#39;ata&#39;, nairobi', 15000000, 'house', 'sale', 'ready to move', 'unfurnished', 0, 0, 0, 1500000, '4', '3', '1', 'no', 'yes', 'no', 'yes', 'yes', 'yes', 'yes', 'no', 'no', 'no', 'no', 'no', 'UDvGDVR8S9imMhYF5hK0.jpg', '9AbG8uCfFvUDeoSTBHBV.jpg', '0d3XGz9ARzIgnT82mVp2.jpg', 'CU096uVpX5jB7Lwip9vn.jpg', 'CU096uVpX5jB7Lwip9vn.jpg', 'CU096uVpX5jB7Lwip9vn.jpg', 'This property will have you feeling as if you were in the mountains! Your monthly rent already covers power, water, sewer and trash so all you need to do is move in! Washer and dryer are already in house', '2022-12-09 00:00:00', '2023-01-22 09:38:08', 'Approved'),
(6, '2', 'house for sale in kilimani', 'lang&#39;ata&#39;, nairobi', 15000000, 'house', 'sale', 'ready to move', 'unfurnished', 0, 0, 0, 1500000, '4', '3', '1', 'no', 'yes', 'no', 'yes', 'yes', 'yes', 'yes', 'no', 'no', 'no', 'no', 'no', 'WJVQAVO7U0rdWK7Ts8x8.jpg', 'vF3HC0o7x91mAaWD0Tmd.jpg', '0d3XGz9ARzIgnT82mVp2.jpg', 'CU096uVpX5jB7Lwip9vn.jpg', 'CU096uVpX5jB7Lwip9vn.jpg', 'CU096uVpX5jB7Lwip9vn.jpg', 'This property will have you feeling as if you were in the mountains! Your monthly rent already covers power, water, sewer and trash so all you need to do is move in! Washer and dryer are already in house', '2022-12-09 00:00:00', '2023-01-22 09:26:22', 'Declined'),
(7, '2', 'house for sale in karen', 'karen, karen blixen ,kenya', 20000000, 'house', 'sale', 'ready to move', 'furnished', 0, 0, 0, 850000, '4', '4', '4', 'no', 'no', 'yes', 'no', 'yes', 'no', 'no', 'yes', 'yes', 'no', 'no', 'no', 'CU096uVpX5jB7Lwip9vn.jpg', '99Xzs3ziOBJsTMZ4cUWb.jpg', '0d3XGz9ARzIgnT82mVp2.jpg', 'CU096uVpX5jB7Lwip9vn.jpg', 'CU096uVpX5jB7Lwip9vn.jpg', 'CU096uVpX5jB7Lwip9vn.jpg', 'This property will have you feeling as if you were in the mountains! Your monthly rent already covers power, water, sewer and trash so all you need to do is move in! Washer and dryer are already in house.', '2022-12-08 00:00:00', '2023-01-22 08:19:23', 'Pending Approval'),
(8, '2', 'Kileleshwa', 'kileshwa , nairobi', 6000000, 'house', 'sale', 'ready to move', 'furnished', 0, 0, 0, 450000, '3', '3', '3', 'no', 'no', 'yes', 'no', 'yes', 'yes', 'yes', 'no', 'no', 'no', 'no', 'no', '8UomVRRQ2NVnijZiMgOD.jpg', 'fpQAIinV3npCXnqOOkBL.jpg', 'XlVijyVL12eZnLncqSiN.jpg', 'CU096uVpX5jB7Lwip9vn.jpg', 'CU096uVpX5jB7Lwip9vn.jpg', 'CU096uVpX5jB7Lwip9vn.jpg', 'This property will have you feeling as if you were in the mountains! Your monthly rent already covers power, water, sewer and trash so all you need to do is move in! Washer and dryer are already in house', '2022-12-09 00:00:00', '2023-01-23 14:10:56', 'Pending Approval'),
(9, '1', 'Kileleshwa', 'kileshwa , nairobi', 6000000, 'house', 'sale', 'ready to move', 'furnished', 0, 0, 0, 450000, '3', '3', '3', 'no', 'no', 'yes', 'no', 'yes', 'yes', 'yes', 'no', 'no', 'no', 'no', 'no', 'rirJz63SwvMGKStC8Q0P.jpg', 'pgyotleRBVX4SEjQBZud.jpg', 'wRmKHuL3mxhsYQqi9ILe.jpg', 'CU096uVpX5jB7Lwip9vn.jpg', 'CU096uVpX5jB7Lwip9vn.jpg', 'CU096uVpX5jB7Lwip9vn.jpg', 'This property will have you feeling as if you were in the mountains! Your monthly rent already covers power, water, sewer and trash so all you need to do is move in! Washer and dryer are already in house', '2022-12-09 00:00:00', '2023-01-20 10:12:47', 'Pending Payment'),
(10, '1', 'house for sale in langÃ¡ta', 'lang&#39;ata&#39;, nairobi', 15000000, 'house', 'sale', 'ready to move', 'unfurnished', 0, 0, 0, 1500000, '4', '3', '1', 'no', 'yes', 'no', 'yes', 'yes', 'yes', 'yes', 'no', 'no', 'no', 'no', 'no', 'EuGVsQ5q4ZePEPSOi0Oo.jpg', 'FHTTEkr1qfCGCo485qXA.jpg', '0d3XGz9ARzIgnT82mVp2.jpg', 'CU096uVpX5jB7Lwip9vn.jpg', 'CU096uVpX5jB7Lwip9vn.jpg', 'CU096uVpX5jB7Lwip9vn.jpg', 'This property will have you feeling as if you were in the mountains! Your monthly rent already covers power, water, sewer and trash so all you need to do is move in! Washer and dryer are already in house', '2022-12-09 00:00:00', '2023-01-20 10:12:55', 'Pending Payment'),
(11, '1', 'house for sale in kilimani', 'lang&#39;ata&#39;, nairobi', 15000000, 'house', 'sale', 'ready to move', 'unfurnished', 0, 0, 0, 1500000, '4', '3', '1', 'no', 'yes', 'no', 'yes', 'yes', 'yes', 'yes', 'no', 'no', 'no', 'no', 'no', 'UDvGDVR8S9imMhYF5hK0.jpg', '9AbG8uCfFvUDeoSTBHBV.jpg', '0d3XGz9ARzIgnT82mVp2.jpg', 'CU096uVpX5jB7Lwip9vn.jpg', 'CU096uVpX5jB7Lwip9vn.jpg', 'CU096uVpX5jB7Lwip9vn.jpg', 'This property will have you feeling as if you were in the mountains! Your monthly rent already covers power, water, sewer and trash so all you need to do is move in! Washer and dryer are already in house', '2022-12-09 00:00:00', '2023-01-20 10:12:58', 'Pending Payment'),
(12, '1', 'house for sale in kilimani', 'lang&#39;ata&#39;, nairobi', 15000000, 'house', 'sale', 'ready to move', 'unfurnished', 0, 0, 0, 1500000, '4', '3', '1', 'no', 'yes', 'no', 'yes', 'yes', 'yes', 'yes', 'no', 'no', 'no', 'no', 'no', 'WJVQAVO7U0rdWK7Ts8x8.jpg', 'vF3HC0o7x91mAaWD0Tmd.jpg', '0d3XGz9ARzIgnT82mVp2.jpg', 'CU096uVpX5jB7Lwip9vn.jpg', 'CU096uVpX5jB7Lwip9vn.jpg', 'CU096uVpX5jB7Lwip9vn.jpg', 'This property will have you feeling as if you were in the mountains! Your monthly rent already covers power, water, sewer and trash so all you need to do is move in! Washer and dryer are already in house', '2022-12-09 00:00:00', '2023-01-20 10:13:02', 'Pending Payment'),
(13, '1', 'Karen, ', 'Nairobi Karen', 500000, 'flat', 'sale', 'under construction', 'unfurnished', 0, 0, 0, 30000, '3', '2', '2', 'yes', 'no', 'no', 'yes', 'no', 'no', 'yes', 'no', 'no', 'no', 'no', 'no', '8CrmIht9I5SvRzpmUbOX.jpg', 'L8FFsUQxTix9eDMPwnTX.jpg', '0d3XGz9ARzIgnT82mVp2.jpg', 'CU096uVpX5jB7Lwip9vn.jpg', 'CU096uVpX5jB7Lwip9vn.jpg', 'CU096uVpX5jB7Lwip9vn.jpg', 'This property will have you feeling as if you were...', NULL, '2023-01-20 10:13:06', 'Pending Payment'),
(14, '1', 'Karen, ', 'Nairobi Karen', 6000000, 'flat', 'sale', 'ready to move', 'furnished', 0, 0, 0, 400000, '1', '1', '0', 'no', 'no', 'yes', 'no', 'yes', 'no', 'yes', 'no', 'yes', 'no', 'no', 'yes', 'xCKrTngsERWb8M5pRYJV.jpg', 'WmTV0HW0iuZ2ByIV1GR0.jpg', '0d3XGz9ARzIgnT82mVp2.jpg', 'CU096uVpX5jB7Lwip9vn.jpg', 'CU096uVpX5jB7Lwip9vn.jpg', 'CU096uVpX5jB7Lwip9vn.jpg', 'This property will have you feeling as if you were...', NULL, '2023-01-20 10:13:10', 'Pending Payment'),
(15, '1', 'house for sale in Karen', 'Nairobi Karen', 400000, 'house', 'sale', 'ready to move', 'furnished', 0, 0, 0, 20000, '4', '4', '0', 'yes', 'yes', 'no', 'yes', 'no', 'no', 'yes', 'yes', 'no', 'no', 'no', 'no', 'nHKAWb3HmWvbA3GUgxcn.jpg', 'ec2sj3IxTCewdZyKAXC5.jpg', 'CoOH5gS6eFVzU7yof3ui.jpg', 'CU096uVpX5jB7Lwip9vn.jpg', 'CU096uVpX5jB7Lwip9vn.jpg', 'CU096uVpX5jB7Lwip9vn.jpg', 'This property will have you feeling as if you were...', '2022-12-21 17:48:36', '2023-01-20 10:13:13', 'Pending Payment'),
(16, '1', 'house for sale in kilimani', 'Nairobi Kilimani', 50000000, 'house', 'sale', 'ready to move', 'semi-furnished', 0, 0, 0, 200000, '3', '2', '1', 'yes', 'no', 'no', 'no', 'no', 'no', 'no', 'no', 'no', 'no', 'no', 'no', '2PeOTNjgU8YySzF8HAJg.jpg', 'bRuEhqZAcON44FsbyEg7.jpg', '0d3XGz9ARzIgnT82mVp2.jpg', 'CU096uVpX5jB7Lwip9vn.jpg', 'CU096uVpX5jB7Lwip9vn.jpg', 'CU096uVpX5jB7Lwip9vn.jpg', 'Enter your house details above and click the Generate description button to see a custom social copy display here', '2022-12-21 23:53:23', '2023-01-20 10:13:17', 'Pending Payment'),
(31, '2', 'work', '12 Boulevard', 100, 'house', 'sale', 'ready to move', 'furnished', 1, 11, 9, 1000000, '1', '1', '1', 'yes', 'yes', 'yes', 'yes', 'yes', 'yes', 'yes', 'yes', 'yes', 'yes', 'yes', 'yes', 'CU096uVpX5jB7Lwip9vn.jpg', 'CU096uVpX5jB7Lwip9vn.jpg', 'wRmKHuL3mxhsYQqi9ILe.jpg', 'CU096uVpX5jB7Lwip9vn.jpg', 'CU096uVpX5jB7Lwip9vn.jpg', 'CU096uVpX5jB7Lwip9vn.jpg', 'hey', '2023-01-21 22:27:41', '2023-01-23 14:11:01', 'Pending Approval'),
(43, '2', 'qw', '12', 12, 'house', 'sale', 'ready to move', 'furnished', 12, 10, 12, 12, '1', '1', '1', 'no', 'no', 'no', 'no', 'no', 'no', 'no', 'no', 'no', 'no', 'no', 'no', '167456480609241IT5TxwhPL._AC_SL1340_.jpg', '167456480610151Yj2B3CHBL._AC_SL1425_.jpg', '167456480611041IT5TxwhPL._AC_SL1340_.jpg', '167456480611841IT5TxwhPL._AC_SL1340_.jpg', '167456480612641IT5TxwhPL._AC_SL1340_.jpg', '167456480613341IT5TxwhPL._AC_SL1340_.jpg', '12', '2023-01-23 23:46:28', '2023-01-24 15:53:26', 'Pending Approval'),
(44, '2', '12', '122', 12, 'house', 'sale', 'ready to move', 'furnished', 12, 12, 12, 12, '1', '1', '1', 'no', 'no', 'no', 'no', 'no', 'no', 'no', 'no', 'no', 'no', 'no', 'no', '1674516566416Joker-Wallpaper-For-PC.jpg', '1674516566433Joker-Wallpaper-For-PC.jpg', '1674516566449Joker-Wallpaper-For-PC.jpg', 'CU096uVpX5jB7Lwip9vn.jpg', 'CU096uVpX5jB7Lwip9vn.jpg', 'CU096uVpX5jB7Lwip9vn.jpg', '122', '2023-01-24 02:29:26', '2023-01-24 02:30:47', 'Pending Approval');

-- --------------------------------------------------------

--
-- Table structure for table `sales`
--

CREATE TABLE `sales` (
  `sale_id` int(10) NOT NULL,
  `property_id` int(10) NOT NULL,
  `user_id` int(10) NOT NULL,
  `amount` int(10) NOT NULL,
  `payment_type` varchar(10) NOT NULL DEFAULT 'Card',
  `pay_for` varchar(10) NOT NULL DEFAULT '"property"',
  `creation_time` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `sales`
--

INSERT INTO `sales` (`sale_id`, `property_id`, `user_id`, `amount`, `payment_type`, `pay_for`, `creation_time`) VALUES
(1, 5, 2, 120000, 'Card', '\"property\"', '2023-01-23 15:43:23'),
(4, 1, 1, 2000000, 'Card', '\"property\"', '2023-01-23 21:44:52'),
(5, 1, 1, 2000000, 'Card', '\"property\"', '2023-01-23 21:44:52');

-- --------------------------------------------------------

--
-- Table structure for table `saved`
--

CREATE TABLE `saved` (
  `saved_id` int(10) NOT NULL,
  `property_id` int(10) NOT NULL,
  `user_id` int(10) NOT NULL,
  `status` varchar(10) NOT NULL DEFAULT 'yes'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `user_id` int(10) NOT NULL,
  `first_name` varchar(40) NOT NULL,
  `last_name` varchar(40) NOT NULL,
  `email` varchar(40) NOT NULL,
  `password` longtext NOT NULL,
  `user_role` int(8) NOT NULL DEFAULT 2
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`user_id`, `first_name`, `last_name`, `email`, `password`, `user_role`) VALUES
(1, 'a', 'a', 'a@a', '$2a$10$1AUjWaSBXmKEQQkwqey9EuB0mA1wIY41.CsVApdabD8ukG12QqAYC', 2),
(2, 'z', 'z', 'z@z', '$2a$10$LSi52Sv61DOgJzmwOQo.jOELctTSCHT1snus7z/Ejx4h.VeBRTw3y', 3),
(3, 'w', 'w', 'w@w', '$2a$10$lU6F8AHzWQ.YCwRsaVpCyOxDmmMVM8GT1ecGQ5gw1gCs4JrMYsyw.', 5),
(4, 'h', 'h', 'h@h', '$2a$10$fnVE8jeEZeehnH3Z7FA.N.oAszQw5oCl9HC6Zo3A2kfR6UWMDTOiG', 4),
(5, 'w', 'w', 'www@w', '$2a$10$mPI8vi.kdfKQho25nRbTV.UrrxhYqSrLKsvSSt3zbsTU6v38PO7Ka', 3),
(6, 'w', 'w', 'wwwww@w', '$2a$10$/8zAN6hBmjDbVPomPQPf/uT4pqY60CbUOXWlhSqQrTFJC4BpSZta.', 3),
(7, 'q', 'q', 'q@q', '$2a$10$njZNeGPMNkX.s6467JGIfuHYdgNWRdi1AEhOfoJ0pmulEG6jEe6wy', 1),
(8, 'admin', 'admin', 'ad@admin.com', '$2a$10$6I8zgXgCRKGiDvNv6/N2sey1qvLJyQ1PHWaiv0gkDBgj6WdKwvCva', 1);

-- --------------------------------------------------------

--
-- Table structure for table `user_roles`
--

CREATE TABLE `user_roles` (
  `id` int(8) NOT NULL,
  `role` enum('buyer','seller','valuer','agent','admin') NOT NULL DEFAULT 'buyer'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `user_roles`
--

INSERT INTO `user_roles` (`id`, `role`) VALUES
(1, 'admin'),
(2, 'buyer'),
(3, 'seller'),
(4, 'agent'),
(5, 'valuer');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `enquiry`
--
ALTER TABLE `enquiry`
  ADD PRIMARY KEY (`enquiry_id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `property_id` (`property_id`);

--
-- Indexes for table `feedback`
--
ALTER TABLE `feedback`
  ADD PRIMARY KEY (`feedback_id`),
  ADD KEY `enquiry_id` (`enquiry_id`);

--
-- Indexes for table `process`
--
ALTER TABLE `process`
  ADD PRIMARY KEY (`process_id`);

--
-- Indexes for table `property`
--
ALTER TABLE `property`
  ADD PRIMARY KEY (`property_id`);

--
-- Indexes for table `sales`
--
ALTER TABLE `sales`
  ADD PRIMARY KEY (`sale_id`),
  ADD KEY `property_id` (`property_id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `saved`
--
ALTER TABLE `saved`
  ADD PRIMARY KEY (`saved_id`),
  ADD KEY `property_id` (`property_id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`user_id`),
  ADD KEY `fk_role_id` (`user_role`);

--
-- Indexes for table `user_roles`
--
ALTER TABLE `user_roles`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `enquiry`
--
ALTER TABLE `enquiry`
  MODIFY `enquiry_id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `feedback`
--
ALTER TABLE `feedback`
  MODIFY `feedback_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `process`
--
ALTER TABLE `process`
  MODIFY `process_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `property`
--
ALTER TABLE `property`
  MODIFY `property_id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=46;

--
-- AUTO_INCREMENT for table `sales`
--
ALTER TABLE `sales`
  MODIFY `sale_id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `saved`
--
ALTER TABLE `saved`
  MODIFY `saved_id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `user_id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `user_roles`
--
ALTER TABLE `user_roles`
  MODIFY `id` int(8) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `enquiry`
--
ALTER TABLE `enquiry`
  ADD CONSTRAINT `enquiry_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`),
  ADD CONSTRAINT `enquiry_ibfk_2` FOREIGN KEY (`property_id`) REFERENCES `property` (`property_id`);

--
-- Constraints for table `feedback`
--
ALTER TABLE `feedback`
  ADD CONSTRAINT `feedback_ibfk_1` FOREIGN KEY (`enquiry_id`) REFERENCES `enquiry` (`enquiry_id`);

--
-- Constraints for table `sales`
--
ALTER TABLE `sales`
  ADD CONSTRAINT `sales_ibfk_1` FOREIGN KEY (`property_id`) REFERENCES `property` (`property_id`),
  ADD CONSTRAINT `sales_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`);

--
-- Constraints for table `saved`
--
ALTER TABLE `saved`
  ADD CONSTRAINT `saved_ibfk_1` FOREIGN KEY (`property_id`) REFERENCES `property` (`property_id`),
  ADD CONSTRAINT `saved_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`);

--
-- Constraints for table `users`
--
ALTER TABLE `users`
  ADD CONSTRAINT `fk_role_id` FOREIGN KEY (`user_role`) REFERENCES `user_roles` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
