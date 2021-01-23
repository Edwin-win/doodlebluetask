-- phpMyAdmin SQL Dump
-- version 5.0.4
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Jan 23, 2021 at 06:43 PM
-- Server version: 10.4.17-MariaDB
-- PHP Version: 8.0.0

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `doodlebluetask`
--

-- --------------------------------------------------------

--
-- Table structure for table `mas_order_status`
--

CREATE TABLE `mas_order_status` (
  `status_id` int(2) NOT NULL,
  `status_name` varchar(30) DEFAULT NULL,
  `status_isActive` tinyint(1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `mas_order_status`
--

INSERT INTO `mas_order_status` (`status_id`, `status_name`, `status_isActive`) VALUES
(1, 'Pending', 1),
(2, 'In Progress', 1),
(3, 'Completed', 1),
(4, 'Canceled', 1);

-- --------------------------------------------------------

--
-- Table structure for table `mas_product`
--

CREATE TABLE `mas_product` (
  `product_id` int(11) NOT NULL,
  `product_unique_code` varchar(10) NOT NULL,
  `product_name` varchar(30) NOT NULL,
  `product_category` int(11) DEFAULT NULL,
  `product_description` varchar(100) NOT NULL,
  `product_qty` int(11) NOT NULL,
  `product_amount` decimal(10,0) NOT NULL,
  `product_image` varchar(100) DEFAULT NULL,
  `product_status` tinyint(1) NOT NULL DEFAULT 1 COMMENT '0 - inactive, 1 - active',
  `product_created_on` datetime NOT NULL,
  `product_created_by` int(11) NOT NULL,
  `product_updated_on` datetime DEFAULT NULL,
  `product_upadted_by` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `mas_product`
--

INSERT INTO `mas_product` (`product_id`, `product_unique_code`, `product_name`, `product_category`, `product_description`, `product_qty`, `product_amount`, `product_image`, `product_status`, `product_created_on`, `product_created_by`, `product_updated_on`, `product_upadted_by`) VALUES
(1, 'PR-1', 'Tv', NULL, 'pr des', 3, '45000', NULL, 1, '2021-01-23 16:22:36', 1, '2021-01-23 17:12:57', 1),
(2, 'PR-2', 'Fridge', NULL, 'pr des', 5, '25000', NULL, 1, '2021-01-23 16:22:36', 1, '2021-01-23 17:12:57', 1),
(3, 'PR-3', 'Laptop', NULL, 'pr des', 6, '70000', NULL, 1, '2021-01-23 16:22:36', 1, '2021-01-23 17:12:57', 1),
(4, 'PR-4', 'Fan', NULL, 'pr des', 3, '4000', NULL, 1, '2021-01-23 16:22:36', 1, '2021-01-23 17:12:57', 1),
(5, 'PR-5', 'Washing Machine', NULL, 'prod des', 5, '15000', NULL, 1, '2021-01-23 16:31:23', 1, '2021-01-23 17:12:57', 1);

-- --------------------------------------------------------

--
-- Table structure for table `mas_user`
--

CREATE TABLE `mas_user` (
  `user_id` int(11) NOT NULL,
  `user_type` int(11) NOT NULL,
  `user_name` varchar(50) DEFAULT NULL,
  `user_phoneno` varchar(15) DEFAULT NULL,
  `user_email` varchar(50) DEFAULT NULL,
  `user_password` varchar(100) DEFAULT NULL,
  `user_active_status` tinyint(1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `mas_user`
--

INSERT INTO `mas_user` (`user_id`, `user_type`, `user_name`, `user_phoneno`, `user_email`, `user_password`, `user_active_status`) VALUES
(1, 1, 'Edwin', '7598957370', 'edwin@gmail.com', '$2b$10$2eWr8kkcKtQLYNH3OKtRGun.R2CLXaHgCuo.VoHmD0colsIeYPa66', 1),
(7, 3, 'Arjun', '7598957371', 'arjun@gmail.com', '$2b$10$Z3ZntkwOZ.9koe0rdlNFFeCaG0DrH5H1nFTfo5nWz7lZ.GchaN05u', 1);

-- --------------------------------------------------------

--
-- Table structure for table `mas_user_type`
--

CREATE TABLE `mas_user_type` (
  `user_type_id` int(11) NOT NULL,
  `user_type` varchar(10) DEFAULT NULL,
  `user_type_status` tinyint(1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `mas_user_type`
--

INSERT INTO `mas_user_type` (`user_type_id`, `user_type`, `user_type_status`) VALUES
(1, 'Admin', 1),
(2, 'Employee', 1),
(3, 'Customer', 1);

-- --------------------------------------------------------

--
-- Table structure for table `trn_order`
--

CREATE TABLE `trn_order` (
  `order_id` int(11) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `order_total_amount` decimal(10,0) DEFAULT NULL,
  `order_payment_mode` varchar(10) DEFAULT NULL,
  `order_collect_amount` decimal(10,0) DEFAULT NULL,
  `order_status` int(1) NOT NULL COMMENT '1 - pending,2 - inprogress, 3- delivered,4 - canceled',
  `order_createdBy` int(11) DEFAULT NULL,
  `order_createdOn` datetime DEFAULT NULL,
  `order_updatedBy` int(11) DEFAULT NULL,
  `order_updatedOn` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `trn_order`
--

INSERT INTO `trn_order` (`order_id`, `user_id`, `order_total_amount`, `order_payment_mode`, `order_collect_amount`, `order_status`, `order_createdBy`, `order_createdOn`, `order_updatedBy`, `order_updatedOn`) VALUES
(14, 7, '1000', 'cash', '1000', 2, 7, '2021-01-23 19:00:58', 7, '2021-01-23 22:42:19'),
(15, 7, '1000', 'cash', '1000', 1, 7, '2021-01-23 21:49:07', NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `trn_order_details`
--

CREATE TABLE `trn_order_details` (
  `order_det_id` int(11) NOT NULL,
  `order_id` int(11) DEFAULT NULL,
  `product_id` int(11) NOT NULL,
  `product_qty` int(11) DEFAULT NULL,
  `product_amount` decimal(10,0) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `trn_order_details`
--

INSERT INTO `trn_order_details` (`order_det_id`, `order_id`, `product_id`, `product_qty`, `product_amount`) VALUES
(9, 14, 1, 2, '100'),
(10, 14, 2, 1, '100'),
(11, 15, 1, 2, '100'),
(12, 15, 2, 1, '100');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `mas_order_status`
--
ALTER TABLE `mas_order_status`
  ADD PRIMARY KEY (`status_id`);

--
-- Indexes for table `mas_product`
--
ALTER TABLE `mas_product`
  ADD PRIMARY KEY (`product_id`);

--
-- Indexes for table `mas_user`
--
ALTER TABLE `mas_user`
  ADD PRIMARY KEY (`user_id`),
  ADD UNIQUE KEY `user_email` (`user_email`),
  ADD UNIQUE KEY `user_phoneno` (`user_phoneno`);

--
-- Indexes for table `mas_user_type`
--
ALTER TABLE `mas_user_type`
  ADD PRIMARY KEY (`user_type_id`);

--
-- Indexes for table `trn_order`
--
ALTER TABLE `trn_order`
  ADD PRIMARY KEY (`order_id`),
  ADD KEY `order_status` (`order_status`);

--
-- Indexes for table `trn_order_details`
--
ALTER TABLE `trn_order_details`
  ADD PRIMARY KEY (`order_det_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `mas_order_status`
--
ALTER TABLE `mas_order_status`
  MODIFY `status_id` int(2) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `mas_product`
--
ALTER TABLE `mas_product`
  MODIFY `product_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `mas_user`
--
ALTER TABLE `mas_user`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `mas_user_type`
--
ALTER TABLE `mas_user_type`
  MODIFY `user_type_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `trn_order`
--
ALTER TABLE `trn_order`
  MODIFY `order_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT for table `trn_order_details`
--
ALTER TABLE `trn_order_details`
  MODIFY `order_det_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `trn_order`
--
ALTER TABLE `trn_order`
  ADD CONSTRAINT `trn_order_ibfk_1` FOREIGN KEY (`order_status`) REFERENCES `mas_order_status` (`status_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
