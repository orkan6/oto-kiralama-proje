-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Anamakine: 127.0.0.1:3306
-- Üretim Zamanı: 13 Oca 2025, 18:28:30
-- Sunucu sürümü: 8.3.0
-- PHP Sürümü: 8.2.18

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Veritabanı: `otokiralama`
--

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `araclar`
--

DROP TABLE IF EXISTS `araclar`;
CREATE TABLE IF NOT EXISTS `araclar` (
  `id` int NOT NULL AUTO_INCREMENT,
  `marka` varchar(50) CHARACTER SET utf8mb3 COLLATE utf8mb3_turkish_ci DEFAULT NULL,
  `model` varchar(50) CHARACTER SET utf8mb3 COLLATE utf8mb3_turkish_ci DEFAULT NULL,
  `yil` int DEFAULT NULL,
  `plaka` varchar(15) CHARACTER SET utf8mb3 COLLATE utf8mb3_turkish_ci DEFAULT NULL,
  `renk` varchar(30) CHARACTER SET utf8mb3 COLLATE utf8mb3_turkish_ci DEFAULT NULL,
  `vites` varchar(20) CHARACTER SET utf8mb3 COLLATE utf8mb3_turkish_ci DEFAULT NULL,
  `yakit` varchar(20) CHARACTER SET utf8mb3 COLLATE utf8mb3_turkish_ci DEFAULT NULL,
  `km` int DEFAULT NULL,
  `durum` varchar(20) CHARACTER SET utf8mb3 COLLATE utf8mb3_turkish_ci DEFAULT NULL,
  `gunluk_ucret` decimal(10,2) DEFAULT NULL,
  `foto` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_turkish_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  `aktif` tinyint(1) DEFAULT '1',
  `silinme_tarihi` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=78 DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_turkish_ci;

--
-- Tablo döküm verisi `araclar`
--

INSERT INTO `araclar` (`id`, `marka`, `model`, `yil`, `plaka`, `renk`, `vites`, `yakit`, `km`, `durum`, `gunluk_ucret`, `foto`, `created_at`, `updated_at`, `aktif`, `silinme_tarihi`) VALUES
(49, 'Fiat', 'Fiorino', 2020, '35 AD 334', 'Mavi', 'Manuel', 'Dizel', 82935, 'Müsait', 529.00, 'arac-1736162657951-701989137.png', '2025-01-06 10:21:25', '2025-01-06 11:24:17', 1, NULL),
(50, 'Renault', 'Clio', 2021, '35 NO 400', 'Beyaz', 'Manuel', 'Benzin', 180546, 'Müsait', 697.00, 'arac-1736162710210-241104398.png', '2025-01-06 10:21:25', '2025-01-06 11:25:10', 1, NULL),
(51, 'Fiat', 'Linea', 2021, '35 LK 875', 'Beyaz', 'Manuel', 'Benzin', 21760, 'Müsait', 938.00, 'arac-1736162681145-777379302.png', '2025-01-06 10:21:25', '2025-01-06 11:24:41', 1, NULL),
(52, 'Peugeot', '301', 2021, '35 GT 895', 'Beyaz', 'Manuel', 'Benzin', 56057, 'Silindi', 905.00, NULL, '2025-01-06 10:21:25', '2025-01-06 11:27:38', 0, NULL),
(53, 'Kia', 'Picanto', 2023, '35 FD 805', 'Beyaz', 'Otomatik', 'Benzin', 114955, 'Müsait', 925.00, 'arac-1736162756481-367186125.png', '2025-01-06 10:21:25', '2025-01-06 11:25:56', 1, NULL),
(54, 'Hyundai', 'I10', 2021, '35 BR 738', 'Beyaz', 'Otomatik', 'Benzin', 161662, 'Müsait', 273.00, 'arac-1736162639975-308908675.png', '2025-01-06 10:21:25', '2025-01-06 11:23:59', 1, NULL),
(55, 'Kia', 'Rio', 2020, '35 BA 785', 'Beyaz', 'Otomatik', 'Benzin', 31666, 'Müsait', 546.00, 'arac-1736162612247-304334401.png', '2025-01-06 10:21:25', '2025-01-06 11:23:32', 1, NULL),
(56, 'Peugeot', 'Rifter', 2017, '35 FV 752', 'Bronz', 'Otomatik', 'Dizel', 174921, 'Müsait', 435.00, 'arac-1736162730336-87536088.png', '2025-01-06 10:21:25', '2025-01-06 11:25:30', 1, NULL),
(57, 'Toyota', 'Proace City', 2017, '35 HZ 730', 'Bronz', 'Otomatik', 'Benzin', 37541, 'Silindi', 726.00, NULL, '2025-01-06 10:21:25', '2025-01-06 11:28:00', 0, NULL),
(58, 'Nissan', 'Qashqai', 2019, '35 SE 379', 'Kırık Beyaz', 'Otomatik', 'Dizel', 161087, 'Müsait', 342.00, 'arac-1736162570865-473214842.png', '2025-01-06 10:21:25', '2025-01-06 11:22:50', 1, NULL),
(59, 'Opel', 'Mokka', 2016, '35 JY 596', 'Beyaz', 'Otomatik', 'Benzin', 83534, 'Silindi', 588.00, NULL, '2025-01-06 10:21:25', '2025-01-06 11:27:43', 0, NULL),
(60, 'Dacia', 'Lodgy Laurate', 2019, '35 OO 440', 'Gri', 'Manuel', 'Dizel', 179371, 'Müsait', 569.00, 'arac-1736162593964-791028572.png', '2025-01-06 10:21:25', '2025-01-06 11:23:13', 1, NULL),
(61, 'Mercedes', 'Vito', 2016, '35 GH 504', 'Siyah', 'Manuel', 'Dizel', 101345, 'Müsait', 445.00, 'arac-1736162510120-159676086.png', '2025-01-06 10:21:25', '2025-01-06 11:21:50', 1, NULL),
(62, 'Ford', 'Tourneo Custom', 2016, '35 TM 213', 'Siyah', 'Manuel', 'Dizel', 197640, 'Silindi', 449.00, NULL, '2025-01-06 10:21:25', '2025-01-06 11:27:52', 0, NULL),
(63, 'Peugeot', 'Expert Traveller', 2016, '35 AC 140', 'Siyah', 'Otomatik', 'Dizel', 16947, 'Müsait', 781.00, 'arac-1736162474402-507631509.png', '2025-01-06 10:21:25', '2025-01-06 11:29:58', 1, NULL),
(64, 'Audi', 'A3', 2018, '35 BV 772', 'Beyaz', 'Otomatik', 'Benzin', 2921, 'Silindi', 453.00, NULL, '2025-01-06 10:21:25', '2025-01-06 11:27:49', 0, NULL),
(65, 'Citroen', 'C4', 2023, '35 MD 244', 'Gri', 'Yarı Otom', 'Benzin', 101838, 'Müsait', 817.00, 'arac-1736162402553-693061669.png', '2025-01-06 10:21:25', '2025-01-06 11:20:02', 1, NULL),
(66, 'Dacia', 'Sandero Stepway', 2019, '35 BM 421', 'Beyaz', 'Otomatik', 'Benzin', 171947, 'Müsait', 328.00, 'arac-1736162357618-543991671.png', '2025-01-06 10:21:25', '2025-01-06 11:19:17', 1, NULL),
(67, 'Fiat', 'Egea Cross', 2015, '35 FR 503', 'Beyaz', 'Manuel', 'Benzin', 185722, 'Müsait', 616.00, 'arac-1736162332681-576346052.png', '2025-01-06 10:21:25', '2025-01-06 11:18:52', 1, NULL),
(68, 'Fiat', 'Doblo', 2015, '35 OP 553', 'Beyaz', 'Manuel', 'Dizel', 7856, 'Kirada', 447.00, 'arac-1736162294474-983618485.png', '2025-01-06 10:21:25', '2025-01-13 08:42:44', 1, NULL),
(69, 'Renault', 'Taliant', 2021, '35 PE 127', 'Beyaz', 'Otomatik', 'Benzin', 26500, 'Müsait', 641.00, 'arac-1736162267556-446688167.png', '2025-01-06 10:21:25', '2025-01-13 11:28:00', 1, NULL),
(70, 'Renault', 'Megane', 2018, '35 SP 731', 'Beyaz', 'Manuel', 'Benzin', 85957, 'Müsait', 774.00, 'arac-1736161983261-944190835.png', '2025-01-06 10:21:25', '2025-01-06 11:13:03', 1, NULL),
(71, 'Dacia', 'Duster 1.0 Comfort', 2020, '35 EC 964', 'Beyaz', 'Manuel', 'Benzin', 13719, 'Silindi', 326.00, 'arac-1736162220214-424672057.png', '2025-01-06 10:21:25', '2025-01-13 08:43:49', 0, NULL),
(72, 'Toyota', 'Corolla', 2019, '35 CM 155', 'Beyaz', 'Otomatik', 'Dizel', 193540, 'Silindi', 874.00, NULL, '2025-01-06 10:21:25', '2025-01-06 11:27:56', 0, NULL),
(74, 'Chery ', 'Tiggo 8', 2024, '35 CR 335', 'Beyaz', 'Otomatik', 'Benzin', 1200, 'Silindi', 854.00, 'arac-1736697381426-408205048.png', '2025-01-12 15:56:21', '2025-01-12 16:04:18', 0, NULL),
(77, 'Chery ', 'Tiggo 8', 2024, '35 EC 964', 'Beyaz', 'Manuel', 'Benzin', 1000, 'Bakımda', 900.00, 'arac-1736767500601-648446550.png', '2025-01-13 11:25:00', '2025-01-13 11:26:29', 1, NULL);

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `bakimlar`
--

DROP TABLE IF EXISTS `bakimlar`;
CREATE TABLE IF NOT EXISTS `bakimlar` (
  `id` int NOT NULL AUTO_INCREMENT,
  `arac_id` int NOT NULL,
  `bakim_tarihi` date DEFAULT NULL,
  `bakim_turu` varchar(50) CHARACTER SET utf8mb3 COLLATE utf8mb3_turkish_ci DEFAULT NULL,
  `bakim_islem` varchar(100) CHARACTER SET utf8mb3 COLLATE utf8mb3_turkish_ci DEFAULT NULL,
  `bakim_ucret` decimal(10,2) DEFAULT NULL,
  `aciklama` text CHARACTER SET utf8mb3 COLLATE utf8mb3_turkish_ci,
  `durum` varchar(20) CHARACTER SET utf8mb3 COLLATE utf8mb3_turkish_ci DEFAULT NULL,
  `planlanan_km` int DEFAULT NULL,
  `bildirim_durumu` varchar(20) CHARACTER SET utf8mb3 COLLATE utf8mb3_turkish_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `arac_id` (`arac_id`)
) ENGINE=InnoDB AUTO_INCREMENT=132 DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_turkish_ci;

--
-- Tablo döküm verisi `bakimlar`
--

INSERT INTO `bakimlar` (`id`, `arac_id`, `bakim_tarihi`, `bakim_turu`, `bakim_islem`, `bakim_ucret`, `aciklama`, `durum`, `planlanan_km`, `bildirim_durumu`, `created_at`, `updated_at`) VALUES
(1, 49, '2024-06-04', 'Planlanan', 'Motor Bakımı', 3610.00, 'Standart bakım işlemleri tamamlandı', 'Tamamlandı', 94716, 'Bildirildi', '2025-01-06 10:56:55', NULL),
(2, 49, '2024-04-27', 'Yapılan', 'Periyodik Bakım', 1351.00, 'Motor yağı ve filtreler değiştirildi', 'Tamamlandı', 95465, 'Bildirildi', '2025-01-06 10:56:55', '2025-01-06 10:56:55'),
(3, 49, '2024-05-05', 'Yapılan', 'Motor Bakımı', 4891.00, 'Rutin periyodik bakım yapıldı', 'Tamamlandı', 97202, 'Bildirildi', '2025-01-06 10:56:55', NULL),
(4, 50, '2024-05-30', 'Planlanan', 'Yağ Değişimi', 2139.00, 'Standart bakım işlemleri tamamlandı', 'Tamamlandı', 191972, 'Bildirildi', '2025-01-06 10:56:55', '2025-01-06 10:56:55'),
(5, 50, '2024-10-12', 'Yapılan', 'Genel Kontrol', 3817.00, 'Standart bakım işlemleri tamamlandı', 'Tamamlandı', 192338, 'Bildirildi', '2025-01-06 10:56:55', '2025-01-06 10:56:55'),
(6, 50, '2024-07-15', 'Yapılan', 'Genel Kontrol', 3989.00, 'Rutin periyodik bakım yapıldı', 'Tamamlandı', 190708, 'Bildirildi', '2025-01-06 10:56:55', NULL),
(7, 51, '2024-06-28', 'Planlanan', 'Yağ Değişimi', 3820.00, 'Standart bakım işlemleri tamamlandı', 'Tamamlandı', 31949, 'Bildirildi', '2025-01-06 10:56:55', '2025-01-06 10:56:55'),
(8, 51, '2024-06-21', 'Planlanan', 'Periyodik Bakım', 2716.00, 'Standart bakım işlemleri tamamlandı', 'Tamamlandı', 35278, 'Bildirildi', '2025-01-06 10:56:55', '2025-01-06 10:56:55'),
(9, 51, '2024-08-29', 'Planlanan', 'Fren Sistemi', 2851.00, 'Standart bakım işlemleri tamamlandı', 'Tamamlandı', 33708, 'Bildirildi', '2025-01-06 10:56:55', '2025-01-06 10:56:55'),
(10, 52, '2024-04-02', 'Planlanan', 'Periyodik Bakım', 1080.00, 'Standart bakım işlemleri tamamlandı', 'Tamamlandı', 70964, 'Bildirildi', '2025-01-06 10:56:55', '2025-01-06 10:56:55'),
(11, 52, '2024-07-05', 'Yapılan', 'Yağ Değişimi', 4620.00, 'Rutin periyodik bakım yapıldı', 'Tamamlandı', 67713, 'Bildirildi', '2025-01-06 10:56:55', '2025-01-06 10:56:55'),
(12, 52, '2024-08-16', 'Planlanan', 'Fren Sistemi', 1333.00, 'Genel bakım ve kontrol yapıldı', 'Tamamlandı', 67221, 'Bildirildi', '2025-01-06 10:56:55', NULL),
(13, 53, '2024-11-08', 'Yapılan', 'Genel Kontrol', 951.00, 'Motor yağı ve filtreler değiştirildi', 'Tamamlandı', 127141, 'Bildirildi', '2025-01-06 10:56:55', NULL),
(14, 53, '2024-10-07', 'Yapılan', 'Genel Kontrol', 1555.00, 'Standart bakım işlemleri tamamlandı', 'Tamamlandı', 129602, 'Bildirildi', '2025-01-06 10:56:55', '2025-01-06 10:56:55'),
(15, 53, '2024-05-25', 'Planlanan', 'Fren Sistemi', 2673.00, 'Standart bakım işlemleri tamamlandı', 'Tamamlandı', 125285, 'Bildirildi', '2025-01-06 10:56:55', NULL),
(16, 54, '2024-08-20', 'Planlanan', 'Yağ Değişimi', 3463.00, 'Fren balataları ve diskleri kontrol edildi', 'Tamamlandı', 173849, 'Bildirildi', '2025-01-06 10:56:55', '2025-01-06 10:56:55'),
(17, 54, '2024-01-08', 'Yapılan', 'Periyodik Bakım', 1732.00, 'Genel bakım ve kontrol yapıldı', 'Tamamlandı', 174264, 'Bildirildi', '2025-01-06 10:56:55', '2025-01-06 10:56:55'),
(18, 54, '2024-08-12', 'Yapılan', 'Periyodik Bakım', 4741.00, 'Fren balataları ve diskleri kontrol edildi', 'Tamamlandı', 172047, 'Bildirildi', '2025-01-06 10:56:55', '2025-01-06 10:56:55'),
(19, 55, '2024-05-16', 'Planlanan', 'Lastik Değişimi', 2422.00, 'Standart bakım işlemleri tamamlandı', 'Tamamlandı', 45397, 'Bildirildi', '2025-01-06 10:56:55', '2025-01-06 10:56:55'),
(20, 55, '2024-07-06', 'Yapılan', 'Genel Kontrol', 4956.00, 'Standart bakım işlemleri tamamlandı', 'Tamamlandı', 42422, 'Bildirildi', '2025-01-06 10:56:55', NULL),
(21, 55, '2024-02-24', 'Planlanan', 'Periyodik Bakım', 4470.00, 'Motor yağı ve filtreler değiştirildi', 'Tamamlandı', 46572, 'Bildirildi', '2025-01-06 10:56:55', '2025-01-06 10:56:55'),
(22, 56, '2024-03-25', 'Yapılan', 'Periyodik Bakım', 4020.00, 'Standart bakım işlemleri tamamlandı', 'Tamamlandı', 185182, 'Bildirildi', '2025-01-06 10:56:55', NULL),
(23, 56, '2024-09-20', 'Planlanan', 'Periyodik Bakım', 4729.00, 'Standart bakım işlemleri tamamlandı', 'Tamamlandı', 185996, 'Bildirildi', '2025-01-06 10:56:55', '2025-01-06 10:56:55'),
(24, 56, '2024-08-25', 'Yapılan', 'Periyodik Bakım', 1470.00, 'Standart bakım işlemleri tamamlandı', 'Tamamlandı', 187570, 'Bildirildi', '2025-01-06 10:56:55', '2025-01-06 10:56:55'),
(25, 57, '2024-08-23', 'Yapılan', 'Motor Bakımı', 974.00, 'Fren balataları ve diskleri kontrol edildi', 'Tamamlandı', 52149, 'Bildirildi', '2025-01-06 10:56:55', '2025-01-06 10:56:55'),
(26, 57, '2024-12-05', 'Planlanan', 'Fren Sistemi', 3792.00, 'Motor yağı ve filtreler değiştirildi', 'Tamamlandı', 51222, 'Bildirildi', '2025-01-06 10:56:55', NULL),
(27, 57, '2024-01-10', 'Yapılan', 'Motor Bakımı', 3099.00, 'Rutin periyodik bakım yapıldı', 'Tamamlandı', 50848, 'Bildirildi', '2025-01-06 10:56:55', '2025-01-06 10:56:55'),
(28, 58, '2025-01-06', 'Yapılan', 'Periyodik Bakım', 1179.00, 'Standart bakım işlemleri tamamlandı', 'Devam Ediyor', 174248, 'Bildirildi', '2025-01-06 10:56:55', NULL),
(29, 58, '2024-09-07', 'Yapılan', 'Lastik Değişimi', 1473.00, 'Rutin periyodik bakım yapıldı', 'Tamamlandı', 172622, 'Bildirildi', '2025-01-06 10:56:55', NULL),
(30, 58, '2024-08-20', 'Planlanan', 'Fren Sistemi', 1630.00, 'Motor yağı ve filtreler değiştirildi', 'Tamamlandı', 175565, 'Bildirildi', '2025-01-06 10:56:55', '2025-01-06 10:56:55'),
(31, 59, '2024-02-22', 'Yapılan', 'Lastik Değişimi', 1061.00, 'Motor yağı ve filtreler değiştirildi', 'Tamamlandı', 93936, 'Bildirildi', '2025-01-06 10:56:55', NULL),
(32, 59, '2024-06-25', 'Planlanan', 'Fren Sistemi', 2909.00, 'Standart bakım işlemleri tamamlandı', 'Tamamlandı', 98138, 'Bildirildi', '2025-01-06 10:56:55', NULL),
(33, 59, '2024-06-03', 'Planlanan', 'Periyodik Bakım', 2886.00, 'Standart bakım işlemleri tamamlandı', 'Tamamlandı', 95970, 'Bildirildi', '2025-01-06 10:56:55', '2025-01-06 10:56:55'),
(34, 60, '2024-09-18', 'Planlanan', 'Fren Sistemi', 3913.00, 'Standart bakım işlemleri tamamlandı', 'Tamamlandı', 193199, 'Bildirildi', '2025-01-06 10:56:55', NULL),
(35, 60, '2024-01-27', 'Yapılan', 'Periyodik Bakım', 2341.00, 'Motor yağı ve filtreler değiştirildi', 'Tamamlandı', 194314, 'Bildirildi', '2025-01-06 10:56:55', '2025-01-06 10:56:55'),
(36, 60, '2024-06-11', 'Yapılan', 'Periyodik Bakım', 4925.00, 'Standart bakım işlemleri tamamlandı', 'Tamamlandı', 192707, 'Bildirildi', '2025-01-06 10:56:55', '2025-01-06 10:56:55'),
(37, 61, '2024-04-21', 'Planlanan', 'Lastik Değişimi', 4625.00, 'Standart bakım işlemleri tamamlandı', 'Tamamlandı', 111508, 'Bildirildi', '2025-01-06 10:56:55', NULL),
(38, 61, '2024-04-11', 'Planlanan', 'Yağ Değişimi', 734.00, 'Standart bakım işlemleri tamamlandı', 'Tamamlandı', 114474, 'Bildirildi', '2025-01-06 10:56:55', '2025-01-06 10:56:55'),
(39, 61, '2024-10-17', 'Yapılan', 'Lastik Değişimi', 1341.00, 'Motor yağı ve filtreler değiştirildi', 'Tamamlandı', 114923, 'Bildirildi', '2025-01-06 10:56:55', '2025-01-06 10:56:55'),
(40, 62, '2024-01-25', 'Yapılan', 'Lastik Değişimi', 1963.00, 'Standart bakım işlemleri tamamlandı', 'Tamamlandı', 209384, 'Bildirildi', '2025-01-06 10:56:55', '2025-01-06 10:56:55'),
(41, 62, '2024-05-17', 'Yapılan', 'Periyodik Bakım', 4002.00, '4 lastik değişimi yapıldı', 'Tamamlandı', 208203, 'Bildirildi', '2025-01-06 10:56:55', NULL),
(42, 62, '2024-07-13', 'Yapılan', 'Motor Bakımı', 1241.00, 'Rutin periyodik bakım yapıldı', 'Tamamlandı', 207835, 'Bildirildi', '2025-01-06 10:56:55', '2025-01-06 10:56:55'),
(43, 63, '2024-04-21', 'Planlanan', 'Motor Bakımı', 907.00, 'Standart bakım işlemleri tamamlandı', 'Tamamlandı', 29462, 'Bildirildi', '2025-01-06 10:56:55', '2025-01-06 10:56:55'),
(44, 63, '2024-10-13', 'Yapılan', 'Lastik Değişimi', 574.00, 'Rutin periyodik bakım yapıldı', 'Tamamlandı', 25835, 'Bildirildi', '2025-01-06 10:56:55', NULL),
(45, 63, '2024-10-23', 'Planlanan', 'Yağ Değişimi', 4448.00, 'Standart bakım işlemleri tamamlandı', 'Tamamlandı', 26788, 'Bildirildi', '2025-01-06 10:56:55', '2025-01-06 10:56:55'),
(46, 64, '2024-11-30', 'Planlanan', 'Genel Kontrol', 4479.00, 'Standart bakım işlemleri tamamlandı', 'Tamamlandı', 16572, 'Bildirildi', '2025-01-06 10:56:55', '2025-01-06 10:56:55'),
(47, 64, '2024-12-01', 'Planlanan', 'Fren Sistemi', 946.00, 'Standart bakım işlemleri tamamlandı', 'Tamamlandı', 13089, 'Bildirildi', '2025-01-06 10:56:55', '2025-01-06 10:56:55'),
(48, 64, '2024-04-20', 'Yapılan', 'Motor Bakımı', 2145.00, 'Standart bakım işlemleri tamamlandı', 'Tamamlandı', 13019, 'Bildirildi', '2025-01-06 10:56:55', NULL),
(49, 65, '2024-01-10', 'Yapılan', 'Yağ Değişimi', 3009.00, 'Standart bakım işlemleri tamamlandı', 'Tamamlandı', 113098, 'Bildirildi', '2025-01-06 10:56:55', '2025-01-06 10:56:55'),
(50, 65, '2024-01-26', 'Planlanan', 'Yağ Değişimi', 1277.00, 'Standart bakım işlemleri tamamlandı', 'Tamamlandı', 115132, 'Bildirildi', '2025-01-06 10:56:55', NULL),
(51, 65, '2024-10-08', 'Yapılan', 'Yağ Değişimi', 3284.00, '4 lastik değişimi yapıldı', 'Tamamlandı', 112835, 'Bildirildi', '2025-01-06 10:56:55', NULL),
(52, 66, '2024-08-15', 'Yapılan', 'Yağ Değişimi', 2843.00, '4 lastik değişimi yapıldı', 'Tamamlandı', 182017, 'Bildirildi', '2025-01-06 10:56:55', '2025-01-06 10:56:55'),
(53, 66, '2024-09-19', 'Planlanan', 'Lastik Değişimi', 3617.00, 'Fren balataları ve diskleri kontrol edildi', 'Tamamlandı', 185990, 'Bildirildi', '2025-01-06 10:56:55', '2025-01-06 10:56:55'),
(54, 66, '2024-11-23', 'Yapılan', 'Periyodik Bakım', 4669.00, '4 lastik değişimi yapıldı', 'Tamamlandı', 186614, 'Bildirildi', '2025-01-06 10:56:55', NULL),
(55, 67, '2024-12-24', 'Yapılan', 'Motor Bakımı', 1818.00, 'Fren balataları ve diskleri kontrol edildi', 'Tamamlandı', 197395, 'Bildirildi', '2025-01-06 10:56:55', '2025-01-06 10:56:55'),
(56, 67, '2024-02-08', 'Yapılan', 'Fren Sistemi', 1365.00, 'Standart bakım işlemleri tamamlandı', 'Tamamlandı', 196900, 'Bildirildi', '2025-01-06 10:56:55', NULL),
(57, 67, '2024-07-21', 'Yapılan', 'Yağ Değişimi', 2808.00, 'Fren balataları ve diskleri kontrol edildi', 'Tamamlandı', 198269, 'Bildirildi', '2025-01-06 10:56:55', '2025-01-06 10:56:55'),
(58, 68, '2024-03-03', 'Planlanan', 'Lastik Değişimi', 1761.00, 'Fren balataları ve diskleri kontrol edildi', 'Tamamlandı', 20580, 'Bildirildi', '2025-01-06 10:56:55', '2025-01-06 10:56:55'),
(59, 68, '2024-02-08', 'Planlanan', 'Fren Sistemi', 3912.00, 'Standart bakım işlemleri tamamlandı', 'Tamamlandı', 20163, 'Bildirildi', '2025-01-06 10:56:55', NULL),
(60, 68, '2024-12-12', 'Yapılan', 'Motor Bakımı', 2621.00, 'Standart bakım işlemleri tamamlandı', 'Tamamlandı', 18012, 'Bildirildi', '2025-01-06 10:56:55', '2025-01-06 10:56:55'),
(61, 69, '2024-01-08', 'Yapılan', 'Yağ Değişimi', 1007.00, '4 lastik değişimi yapıldı', 'Tamamlandı', 36973, 'Bildirildi', '2025-01-06 10:56:55', '2025-01-06 10:56:55'),
(62, 69, '2024-03-11', 'Planlanan', 'Genel Kontrol', 4066.00, 'Rutin periyodik bakım yapıldı', 'Tamamlandı', 40082, 'Bildirildi', '2025-01-06 10:56:55', '2025-01-06 10:56:55'),
(63, 69, '2024-01-16', 'Planlanan', 'Motor Bakımı', 3781.00, 'Motor yağı ve filtreler değiştirildi', 'Tamamlandı', 38753, 'Bildirildi', '2025-01-06 10:56:55', '2025-01-06 10:56:55'),
(64, 70, '2024-11-28', 'Planlanan', 'Periyodik Bakım', 4691.00, 'Standart bakım işlemleri tamamlandı', 'Tamamlandı', 100588, 'Bildirildi', '2025-01-06 10:56:55', NULL),
(65, 70, '2024-04-09', 'Planlanan', 'Genel Kontrol', 4026.00, 'Standart bakım işlemleri tamamlandı', 'Tamamlandı', 100832, 'Bildirildi', '2025-01-06 10:56:55', NULL),
(66, 70, '2024-06-20', 'Yapılan', 'Lastik Değişimi', 2336.00, 'Rutin periyodik bakım yapıldı', 'Tamamlandı', 100266, 'Bildirildi', '2025-01-06 10:56:55', '2025-01-06 10:56:55'),
(67, 71, '2024-11-11', 'Planlanan', 'Motor Bakımı', 1257.00, 'Genel bakım ve kontrol yapıldı', 'Tamamlandı', 27744, 'Bildirildi', '2025-01-06 10:56:55', NULL),
(68, 71, '2024-12-12', 'Yapılan', 'Periyodik Bakım', 4715.00, 'Standart bakım işlemleri tamamlandı', 'Tamamlandı', 27789, 'Bildirildi', '2025-01-06 10:56:55', NULL),
(69, 71, '2024-10-05', 'Planlanan', 'Lastik Değişimi', 1388.00, 'Standart bakım işlemleri tamamlandı', 'Tamamlandı', 25613, 'Bildirildi', '2025-01-06 10:56:55', '2025-01-06 10:56:55'),
(70, 72, '2024-04-28', 'Planlanan', 'Yağ Değişimi', 3201.00, 'Standart bakım işlemleri tamamlandı', 'Tamamlandı', 204102, 'Bildirildi', '2025-01-06 10:56:55', '2025-01-06 10:56:55'),
(71, 72, '2024-12-28', 'Yapılan', 'Fren Sistemi', 813.00, 'Motor yağı ve filtreler değiştirildi', 'Tamamlandı', 205408, 'Bildirildi', '2025-01-06 10:56:55', '2025-01-06 10:56:55'),
(72, 72, '2024-09-28', 'Yapılan', 'Genel Kontrol', 1898.00, 'Fren balataları ve diskleri kontrol edildi', 'Tamamlandı', 206611, 'Bildirildi', '2025-01-06 10:56:55', NULL),
(129, 63, NULL, 'Planlanan', 'Lastik Değişimi', NULL, '', 'Beklemede', 17000, 'Bildirildi', '2025-01-06 11:29:00', '2025-01-06 11:30:02'),
(130, 77, NULL, 'Planlanan', 'Periyodik Bakım', NULL, '', 'Beklemede', 11000, 'Beklemede', '2025-01-13 11:26:46', NULL),
(131, 69, NULL, 'Planlanan', 'Periyodik Bakım', NULL, '', 'Beklemede', 27000, 'Bildirildi', '2025-01-13 11:27:48', '2025-01-13 11:28:05');

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `calisanlar`
--

DROP TABLE IF EXISTS `calisanlar`;
CREATE TABLE IF NOT EXISTS `calisanlar` (
  `id` int NOT NULL AUTO_INCREMENT,
  `ad` varchar(50) CHARACTER SET utf8mb3 COLLATE utf8mb3_turkish_ci DEFAULT NULL,
  `soyad` varchar(50) CHARACTER SET utf8mb3 COLLATE utf8mb3_turkish_ci DEFAULT NULL,
  `tc_no` varchar(11) CHARACTER SET utf8mb3 COLLATE utf8mb3_turkish_ci DEFAULT NULL,
  `telefon` varchar(15) CHARACTER SET utf8mb3 COLLATE utf8mb3_turkish_ci DEFAULT NULL,
  `email` varchar(100) CHARACTER SET utf8mb3 COLLATE utf8mb3_turkish_ci DEFAULT NULL,
  `pozisyon` varchar(50) CHARACTER SET utf8mb3 COLLATE utf8mb3_turkish_ci DEFAULT NULL,
  `maas` decimal(10,2) DEFAULT NULL,
  `ise_baslama_tarihi` date DEFAULT NULL,
  `durum` varchar(20) CHARACTER SET utf8mb3 COLLATE utf8mb3_turkish_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_turkish_ci;

--
-- Tablo döküm verisi `calisanlar`
--

INSERT INTO `calisanlar` (`id`, `ad`, `soyad`, `tc_no`, `telefon`, `email`, `pozisyon`, `maas`, `ise_baslama_tarihi`, `durum`, `created_at`, `updated_at`) VALUES
(1, 'Mehmet', 'Terim', '98765432100', '5551234567', 'mehmet.yonetici@rentacar.com', 'Yönetici', 25000.00, '2021-12-31', 'Aktif', '2025-01-06 10:26:34', '2025-01-06 10:48:28'),
(2, 'Ayşe', 'Demir', '98765432101', '5551234568', 'ayse.demir@rentacar.com', 'Satış Temsilcisi', 17500.00, '2022-03-13', 'Aktif', '2025-01-06 10:26:34', '2025-01-06 10:48:41'),
(7, 'Zeynep', 'Yılmaz', '98765432106', '5551234573', 'zeynep.yilmaz@rentacar.com', 'Satış Temsilcisi', 17000.00, '2022-05-01', 'Aktif', '2025-01-06 10:47:05', NULL),
(8, 'Emre', 'Kaya', '98765432107', '5551234574', 'emre.kaya@rentacar.com', 'Satış Temsilcisi', 16800.00, '2022-07-13', 'Aktif', '2025-01-06 10:47:05', '2025-01-13 08:34:54'),
(9, 'Yasin ', 'Yılmaz', '98765432105', '5555555555', 'yasin@beecar.com', 'Satış Temsilcisi', 22104.00, '2022-01-13', 'Aktif', '2025-01-13 08:34:24', NULL);

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `hasarlar`
--

DROP TABLE IF EXISTS `hasarlar`;
CREATE TABLE IF NOT EXISTS `hasarlar` (
  `id` int NOT NULL AUTO_INCREMENT,
  `kiralama_id` int DEFAULT NULL,
  `hasar_tarihi` date DEFAULT NULL,
  `hasar_turu` varchar(50) CHARACTER SET utf8mb3 COLLATE utf8mb3_turkish_ci DEFAULT NULL,
  `hasar_ucret` decimal(10,2) DEFAULT NULL,
  `aciklama` text CHARACTER SET utf8mb3 COLLATE utf8mb3_turkish_ci,
  `durum` varchar(20) CHARACTER SET utf8mb3 COLLATE utf8mb3_turkish_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `kiralama_id` (`kiralama_id`)
) ENGINE=InnoDB AUTO_INCREMENT=33 DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_turkish_ci;

--
-- Tablo döküm verisi `hasarlar`
--

INSERT INTO `hasarlar` (`id`, `kiralama_id`, `hasar_tarihi`, `hasar_turu`, `hasar_ucret`, `aciklama`, `durum`, `created_at`, `updated_at`) VALUES
(1, 133, '2024-09-27', 'Cam/Far Hasarı', 857.00, 'Ön tamponda çizik', 'Onarıldı', '2025-01-06 11:01:12', '2025-01-06 11:01:12'),
(2, 144, '2024-07-28', 'Diğer', 1951.00, 'Sol ön kapıda göçük', 'Onarıldı', '2025-01-06 11:01:12', NULL),
(3, 146, '2024-10-19', 'Göçük', 1041.00, 'Diğer muhtelif hasarlar', 'Onarıldı', '2025-01-06 11:01:12', NULL),
(4, 159, '2024-07-20', 'Cam/Far Hasarı', 12719.00, 'Sol arka çamurlukta hasar', 'Onarıldı', '2025-01-06 11:01:12', NULL),
(5, 168, '2024-11-07', 'Çizik', 7067.00, 'Diğer muhtelif hasarlar', 'Onarıldı', '2025-01-06 11:01:12', '2025-01-06 11:01:12'),
(6, 171, '2024-11-15', 'Çizik', 2986.00, 'Diğer muhtelif hasarlar', 'Onarıldı', '2025-01-06 11:01:12', '2025-01-06 11:01:12'),
(7, 175, '2024-11-03', 'Kaza', 1303.00, 'Diğer muhtelif hasarlar', 'Onarıldı', '2025-01-06 11:01:12', NULL),
(8, 176, '2024-09-03', 'Çizik', 19738.00, 'Diğer muhtelif hasarlar', 'Onarıldı', '2025-01-06 11:01:12', NULL),
(9, 177, '2024-12-13', 'Çizik', 1396.00, 'Tavan kısmında göçük', 'Onarımda', '2025-01-06 11:01:12', NULL),
(10, 179, '2024-10-11', 'Çizik', 2320.00, 'Diğer muhtelif hasarlar', 'Onarıldı', '2025-01-06 11:01:12', '2025-01-06 11:01:12'),
(11, 180, '2024-09-05', 'Kaza', 895.00, 'Sağ stop lambası kırık', 'Onarıldı', '2025-01-06 11:01:12', NULL),
(12, 182, '2024-09-16', 'Göçük', 1428.00, 'Diğer muhtelif hasarlar', 'Onarıldı', '2025-01-06 11:01:12', '2025-01-06 11:01:12'),
(13, 190, '2024-08-12', 'Cam/Far Hasarı', 2088.00, 'Sol arka çamurlukta hasar', 'Onarıldı', '2025-01-06 11:01:12', NULL),
(14, 193, '2024-11-04', 'Göçük', 10347.00, 'Diğer muhtelif hasarlar', 'Onarıldı', '2025-01-06 11:01:12', NULL),
(15, 195, '2024-09-04', 'Çizik', 918.00, 'Diğer muhtelif hasarlar', 'Onarıldı', '2025-01-06 11:01:12', NULL),
(16, 198, '2024-11-08', 'Cam/Far Hasarı', 1480.00, 'Diğer muhtelif hasarlar', 'Onarıldı', '2025-01-06 11:01:12', '2025-01-06 11:01:12'),
(17, 201, '2024-11-18', 'Çizik', 1140.00, 'Sol arka çamurlukta hasar', 'Onarıldı', '2025-01-06 11:01:12', NULL),
(18, 204, '2024-08-17', 'Diğer', 15449.00, 'Arka tamponda çarpışma hasarı', 'Onarıldı', '2025-01-06 11:01:12', NULL),
(19, 206, '2024-12-28', 'Kaza', 1242.00, 'Diğer muhtelif hasarlar', 'Onarımda', '2025-01-06 11:01:12', '2025-01-06 11:01:13'),
(20, 207, '2024-11-22', 'Cam/Far Hasarı', 518.00, 'Bagaj kapağında göçük', 'Onarıldı', '2025-01-06 11:01:12', '2025-01-06 11:01:12'),
(21, 222, '2024-09-14', 'Diğer', 641.00, 'Sol ön kapıda göçük', 'Onarıldı', '2025-01-06 11:01:12', '2025-01-06 11:01:12'),
(22, 226, '2024-07-21', 'Diğer', 12752.00, 'Sol ön kapıda göçük', 'Onarıldı', '2025-01-06 11:01:12', NULL),
(32, 262, '2025-01-13', 'Çizik', 2000.00, 'sağ kapı çizik', 'İşlemde', '2025-01-13 11:26:29', NULL);

-- --------------------------------------------------------

--
-- Görünüm yapısı durumu `istatistikler`
-- (Asıl görünüm için aşağıya bakın)
--
DROP VIEW IF EXISTS `istatistikler`;
CREATE TABLE IF NOT EXISTS `istatistikler` (
`aktif_kiralama_sayisi` bigint
,`aylik_ciro` decimal(32,2)
,`bakimdaki_arac_sayisi` bigint
,`kiradaki_arac_sayisi` bigint
,`musait_arac_sayisi` bigint
,`toplam_musteri_sayisi` bigint
);

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `kiralamalar`
--

DROP TABLE IF EXISTS `kiralamalar`;
CREATE TABLE IF NOT EXISTS `kiralamalar` (
  `id` int NOT NULL AUTO_INCREMENT,
  `arac_id` int NOT NULL,
  `musteri_id` int NOT NULL,
  `calisan_id` int NOT NULL,
  `baslangic_tarihi` date DEFAULT NULL,
  `bitis_tarihi` date DEFAULT NULL,
  `teslim_tarihi` date DEFAULT NULL,
  `gunluk_ucret` decimal(10,2) DEFAULT NULL,
  `toplam_gun` int DEFAULT NULL,
  `toplam_ucret` decimal(10,2) DEFAULT NULL,
  `alis_km` int DEFAULT NULL,
  `teslim_km` int DEFAULT NULL,
  `odeme_durumu` varchar(20) CHARACTER SET utf8mb3 COLLATE utf8mb3_turkish_ci DEFAULT NULL,
  `durum` varchar(20) CHARACTER SET utf8mb3 COLLATE utf8mb3_turkish_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `fk_kiralama_arac` (`arac_id`),
  KEY `fk_kiralama_musteri` (`musteri_id`),
  KEY `fk_kiralama_calisan` (`calisan_id`)
) ENGINE=InnoDB AUTO_INCREMENT=265 DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_turkish_ci;

--
-- Tablo döküm verisi `kiralamalar`
--

INSERT INTO `kiralamalar` (`id`, `arac_id`, `musteri_id`, `calisan_id`, `baslangic_tarihi`, `bitis_tarihi`, `teslim_tarihi`, `gunluk_ucret`, `toplam_gun`, `toplam_ucret`, `alis_km`, `teslim_km`, `odeme_durumu`, `durum`, `created_at`, `updated_at`) VALUES
(130, 69, 1, 7, '2024-09-13', '2024-09-16', '2024-09-16', 641.00, 3, 4487.00, 25455, 26001, 'Ödendi', 'Tamamlandı', '2025-01-06 10:44:52', '2025-01-06 10:47:30'),
(131, 67, 1, 8, '2024-07-15', '2024-07-16', '2024-07-16', 616.00, 1, 2464.00, 185722, 185875, 'Ödendi', 'Tamamlandı', '2025-01-06 10:44:52', '2025-01-06 10:47:30'),
(132, 66, 1, 2, '2024-09-28', '2024-10-04', '2024-10-04', 328.00, 6, 2296.00, 171947, 172949, 'Ödendi', 'Tamamlandı', '2025-01-06 10:44:52', '2025-01-06 10:44:53'),
(133, 64, 1, 7, '2024-09-26', '2024-09-28', '2024-09-28', 453.00, 2, 453.00, 2921, 3179, 'Ödendi', 'Tamamlandı', '2025-01-06 10:44:52', '2025-01-06 10:47:30'),
(134, 63, 1, 8, '2024-08-05', '2024-08-12', '2024-08-12', 781.00, 7, 5467.00, 15691, 16356, 'Ödendi', 'Tamamlandı', '2025-01-06 10:44:52', '2025-01-06 10:47:30'),
(135, 63, 1, 2, '2024-09-03', '2024-09-10', '2024-09-10', 781.00, 7, 4686.00, 15691, 17364, 'Ödendi', 'Tamamlandı', '2025-01-06 10:44:52', '2025-01-06 10:44:53'),
(136, 61, 1, 7, '2024-08-18', '2024-08-24', '2024-08-24', 445.00, 6, 3115.00, 101345, 101693, 'Ödendi', 'Tamamlandı', '2025-01-06 10:44:52', '2025-01-06 10:47:30'),
(137, 61, 1, 8, '2024-07-13', '2024-07-14', '2024-07-14', 445.00, 1, 3115.00, 101345, 101468, 'Ödendi', 'Tamamlandı', '2025-01-06 10:44:52', '2025-01-06 10:47:30'),
(138, 59, 1, 2, '2024-09-13', '2024-09-19', '2024-09-19', 588.00, 6, 2352.00, 83534, 84692, 'Ödendi', 'Tamamlandı', '2025-01-06 10:44:52', '2025-01-06 10:44:53'),
(139, 57, 1, 7, '2024-07-23', '2024-07-24', '2024-07-24', 726.00, 1, 1452.00, 37541, 37687, 'Ödendi', 'Tamamlandı', '2025-01-06 10:44:52', '2025-01-06 10:47:30'),
(140, 56, 1, 8, '2024-09-21', '2024-09-23', '2024-09-23', 435.00, 2, 3045.00, 174921, 175129, 'Ödendi', 'Tamamlandı', '2025-01-06 10:44:52', '2025-01-06 10:47:30'),
(141, 56, 1, 2, '2024-10-19', '2024-10-24', '2024-10-24', 435.00, 5, 435.00, 174921, 176066, 'Ödendi', 'Tamamlandı', '2025-01-06 10:44:52', '2025-01-06 10:44:53'),
(142, 55, 1, 7, '2024-09-11', '2024-09-13', '2024-09-13', 546.00, 2, 1092.00, 31666, 32038, 'Ödendi', 'Tamamlandı', '2025-01-06 10:44:52', '2025-01-06 10:47:30'),
(143, 54, 1, 8, '2024-08-07', '2024-08-09', '2024-08-09', 273.00, 2, 546.00, 161662, 162048, 'Ödendi', 'Tamamlandı', '2025-01-06 10:44:52', '2025-01-06 10:47:30'),
(144, 53, 1, 2, '2024-07-28', '2024-07-30', '2024-07-30', 925.00, 2, 3700.00, 114955, 115273, 'Ödendi', 'Tamamlandı', '2025-01-06 10:44:52', '2025-01-06 10:44:53'),
(145, 52, 1, 7, '2024-10-27', '2024-10-31', '2024-10-31', 905.00, 4, 2715.00, 56057, 56717, 'Ödendi', 'Tamamlandı', '2025-01-06 10:44:52', '2025-01-06 10:47:30'),
(146, 52, 1, 8, '2024-10-19', '2024-10-21', '2024-10-21', 905.00, 2, 5430.00, 56057, 56251, 'Ödendi', 'Tamamlandı', '2025-01-06 10:44:52', '2025-01-06 10:47:30'),
(147, 51, 1, 2, '2024-07-29', '2024-08-02', '2024-08-02', 938.00, 4, 4690.00, 21760, 22328, 'Ödendi', 'Tamamlandı', '2025-01-06 10:44:52', '2025-01-06 10:44:53'),
(148, 50, 1, 7, '2024-09-07', '2024-09-09', '2024-09-09', 697.00, 2, 1394.00, 180546, 180884, 'Ödendi', 'Tamamlandı', '2025-01-06 10:44:52', '2025-01-06 10:47:30'),
(149, 49, 1, 8, '2024-12-29', '2024-12-30', '2024-12-30', 529.00, 1, 1587.00, 82935, 83105, 'Ödendi', 'Tamamlandı', '2025-01-06 10:44:52', '2025-01-06 10:47:30'),
(150, 71, 2, 2, '2024-08-25', '2024-08-26', '2024-08-26', 326.00, 1, 1630.00, 13719, 13813, 'Ödendi', 'Tamamlandı', '2025-01-06 10:44:52', '2025-01-06 10:44:53'),
(151, 70, 2, 7, '2024-07-30', '2024-08-03', '2024-08-03', 774.00, 4, 4644.00, 85957, 86397, 'Ödendi', 'Tamamlandı', '2025-01-06 10:44:52', '2025-01-06 10:47:30'),
(152, 69, 2, 8, '2024-07-21', '2024-07-26', '2024-07-26', 641.00, 5, 2564.00, 25455, 26555, 'Ödendi', 'Tamamlandı', '2025-01-06 10:44:52', '2025-01-06 10:47:30'),
(153, 68, 2, 2, '2024-12-03', '2024-12-04', '2024-12-04', 447.00, 1, 447.00, 7856, 7975, 'Ödendi', 'Tamamlandı', '2025-01-06 10:44:52', '2025-01-06 10:44:53'),
(154, 68, 2, 7, '2024-07-28', '2024-08-04', '2024-08-04', 447.00, 7, 1788.00, 7856, 8465, 'Ödendi', 'Tamamlandı', '2025-01-06 10:44:52', '2025-01-06 10:47:30'),
(155, 65, 2, 8, '2024-11-07', '2024-11-12', '2024-11-12', 817.00, 5, 2451.00, 101838, 102968, 'Ödendi', 'Tamamlandı', '2025-01-06 10:44:52', '2025-01-06 10:47:30'),
(156, 65, 2, 2, '2024-12-30', '2025-01-02', '2025-01-02', 817.00, 3, 4902.00, 101838, 102495, 'Ödendi', 'Tamamlandı', '2025-01-06 10:44:52', '2025-01-06 10:44:53'),
(157, 64, 2, 7, '2024-08-23', '2024-08-24', '2024-08-24', 453.00, 1, 1359.00, 2921, 3088, 'Ödendi', 'Tamamlandı', '2025-01-06 10:44:52', '2025-01-06 10:47:30'),
(158, 64, 2, 8, '2024-09-19', '2024-09-26', '2024-09-26', 453.00, 7, 2718.00, 2921, 3831, 'Ödendi', 'Tamamlandı', '2025-01-06 10:44:52', '2025-01-06 10:47:30'),
(159, 64, 2, 2, '2024-07-16', '2024-07-21', '2024-07-21', 453.00, 5, 2718.00, 2921, 3421, 'Ödendi', 'Tamamlandı', '2025-01-06 10:44:52', '2025-01-06 10:44:53'),
(160, 63, 2, 7, '2024-10-07', '2024-10-10', '2024-10-10', 781.00, 3, 4686.00, 15691, 15868, 'Ödendi', 'Tamamlandı', '2025-01-06 10:44:52', '2025-01-06 10:47:30'),
(161, 61, 2, 8, '2024-10-17', '2024-10-23', '2024-10-23', 445.00, 6, 1335.00, 101345, 102227, 'Ödendi', 'Tamamlandı', '2025-01-06 10:44:52', '2025-01-06 10:47:30'),
(162, 61, 2, 2, '2024-07-29', '2024-08-05', '2024-08-05', 445.00, 7, 445.00, 101345, 102094, 'Ödendi', 'Tamamlandı', '2025-01-06 10:44:52', '2025-01-06 10:44:53'),
(163, 60, 2, 7, '2024-12-09', '2024-12-10', '2024-12-10', 569.00, 1, 3983.00, 179371, 179616, 'Ödendi', 'Tamamlandı', '2025-01-06 10:44:52', '2025-01-06 10:47:30'),
(164, 59, 2, 8, '2024-07-30', '2024-07-31', '2024-07-31', 588.00, 1, 2352.00, 83534, 83590, 'Ödendi', 'Tamamlandı', '2025-01-06 10:44:52', '2025-01-06 10:47:30'),
(165, 57, 2, 2, '2024-11-03', '2024-11-06', '2024-11-06', 726.00, 3, 2178.00, 37541, 37820, 'Ödendi', 'Tamamlandı', '2025-01-06 10:44:52', '2025-01-06 10:44:53'),
(166, 57, 2, 7, '2024-12-05', '2024-12-12', '2024-12-12', 726.00, 7, 2178.00, 37541, 39263, 'Ödendi', 'Tamamlandı', '2025-01-06 10:44:52', '2025-01-06 10:47:30'),
(167, 54, 2, 8, '2024-11-04', '2024-11-06', '2024-11-06', 273.00, 2, 1092.00, 161662, 161872, 'Ödendi', 'Tamamlandı', '2025-01-06 10:44:52', '2025-01-06 10:47:30'),
(168, 52, 2, 2, '2024-11-06', '2024-11-10', '2024-11-10', 905.00, 4, 6335.00, 56057, 56609, 'Ödendi', 'Tamamlandı', '2025-01-06 10:44:52', '2025-01-06 10:44:53'),
(169, 52, 2, 7, '2024-12-25', '2024-12-26', '2024-12-26', 905.00, 1, 3620.00, 56057, 56181, 'Ödendi', 'Tamamlandı', '2025-01-06 10:44:52', '2025-01-06 10:47:30'),
(170, 51, 2, 8, '2024-07-28', '2024-08-02', '2024-08-02', 938.00, 5, 4690.00, 21760, 22540, 'Ödendi', 'Tamamlandı', '2025-01-06 10:44:52', '2025-01-06 10:47:30'),
(171, 50, 2, 2, '2024-11-14', '2024-11-16', '2024-11-16', 697.00, 2, 2788.00, 180546, 180868, 'Ödendi', 'Tamamlandı', '2025-01-06 10:44:52', '2025-01-06 10:44:53'),
(172, 49, 2, 7, '2024-09-26', '2024-09-28', '2024-09-28', 529.00, 2, 1587.00, 82935, 83105, 'Ödendi', 'Tamamlandı', '2025-01-06 10:44:52', '2025-01-06 10:47:30'),
(173, 71, 3, 8, '2024-11-30', '2024-12-02', '2024-12-02', 326.00, 2, 2282.00, 13719, 13903, 'Ödendi', 'Tamamlandı', '2025-01-06 10:44:52', '2025-01-06 10:47:30'),
(174, 70, 3, 2, '2024-12-17', '2024-12-20', '2024-12-20', 774.00, 3, 4644.00, 85957, 86422, 'Ödendi', 'Tamamlandı', '2025-01-06 10:44:52', '2025-01-06 10:44:53'),
(175, 67, 3, 7, '2024-11-03', '2024-11-06', '2024-11-06', 616.00, 3, 1848.00, 185722, 185878, 'Ödendi', 'Tamamlandı', '2025-01-06 10:44:52', '2025-01-06 10:47:30'),
(176, 65, 3, 8, '2024-08-31', '2024-09-06', '2024-09-06', 817.00, 6, 4085.00, 101838, 102696, 'Ödendi', 'Tamamlandı', '2025-01-06 10:44:52', '2025-01-06 10:47:30'),
(177, 64, 3, 2, '2024-12-13', '2024-12-14', '2024-12-14', 453.00, 1, 3171.00, 2921, 3032, 'Ödendi', 'Tamamlandı', '2025-01-06 10:44:52', '2025-01-06 10:44:53'),
(178, 63, 3, 7, '2024-07-15', '2024-07-16', '2024-07-16', 781.00, 1, 3124.00, 15691, 15766, 'Ödendi', 'Tamamlandı', '2025-01-06 10:44:52', '2025-01-06 10:47:30'),
(179, 60, 3, 8, '2024-10-11', '2024-10-17', '2024-10-17', 569.00, 6, 3983.00, 179371, 180529, 'Ödendi', 'Tamamlandı', '2025-01-06 10:44:52', '2025-01-06 10:47:30'),
(180, 60, 3, 2, '2024-09-05', '2024-09-08', '2024-09-08', 569.00, 3, 1707.00, 179371, 179641, 'Ödendi', 'Tamamlandı', '2025-01-06 10:44:52', '2025-01-06 10:44:53'),
(181, 55, 3, 7, '2024-09-20', '2024-09-23', '2024-09-23', 546.00, 3, 546.00, 31666, 32329, 'Ödendi', 'Tamamlandı', '2025-01-06 10:44:52', '2025-01-06 10:47:30'),
(182, 54, 3, 8, '2024-09-12', '2024-09-17', '2024-09-17', 273.00, 5, 546.00, 161662, 162592, 'Ödendi', 'Tamamlandı', '2025-01-06 10:44:52', '2025-01-06 10:47:30'),
(183, 53, 3, 2, '2024-11-17', '2024-11-21', '2024-11-21', 925.00, 4, 4625.00, 114955, 115831, 'Ödendi', 'Tamamlandı', '2025-01-06 10:44:52', '2025-01-06 10:44:53'),
(184, 51, 3, 7, '2024-07-31', '2024-08-03', '2024-08-03', 938.00, 3, 938.00, 21760, 22015, 'Ödendi', 'Tamamlandı', '2025-01-06 10:44:52', '2025-01-06 10:47:30'),
(185, 50, 3, 8, '2024-11-21', '2024-11-23', '2024-11-23', 697.00, 2, 3485.00, 180546, 180784, 'Ödendi', 'Tamamlandı', '2025-01-06 10:44:52', '2025-01-06 10:47:30'),
(186, 49, 3, 2, '2024-12-08', '2024-12-10', '2024-12-10', 529.00, 2, 1587.00, 82935, 83117, 'Ödendi', 'Tamamlandı', '2025-01-06 10:44:52', '2025-01-06 10:44:53'),
(187, 72, 4, 7, '2024-09-25', '2024-09-27', '2024-09-27', 874.00, 2, 874.00, 193540, 194034, 'Ödendi', 'Tamamlandı', '2025-01-06 10:44:52', '2025-01-06 10:47:30'),
(188, 71, 4, 8, '2024-09-22', '2024-09-27', '2024-09-27', 326.00, 5, 652.00, 13719, 14284, 'Ödendi', 'Tamamlandı', '2025-01-06 10:44:52', '2025-01-06 10:47:30'),
(189, 69, 4, 2, '2024-09-16', '2024-09-18', '2024-09-18', 641.00, 2, 3846.00, 25455, 25803, 'Ödendi', 'Tamamlandı', '2025-01-06 10:44:52', '2025-01-06 10:44:53'),
(190, 68, 4, 7, '2024-08-10', '2024-08-13', '2024-08-13', 447.00, 3, 3129.00, 7856, 8096, 'Ödendi', 'Tamamlandı', '2025-01-06 10:44:52', '2025-01-06 10:47:30'),
(191, 68, 4, 8, '2024-11-21', '2024-11-23', '2024-11-23', 447.00, 2, 1788.00, 7856, 8318, 'Ödendi', 'Tamamlandı', '2025-01-06 10:44:52', '2025-01-06 10:47:30'),
(192, 67, 4, 2, '2024-10-24', '2024-10-26', '2024-10-26', 616.00, 2, 3080.00, 185722, 185850, 'Ödendi', 'Tamamlandı', '2025-01-06 10:44:52', '2025-01-06 10:44:53'),
(193, 66, 4, 7, '2024-11-04', '2024-11-07', '2024-11-07', 328.00, 3, 2296.00, 171947, 172484, 'Ödendi', 'Tamamlandı', '2025-01-06 10:44:52', '2025-01-06 10:47:30'),
(194, 66, 4, 8, '2024-09-01', '2024-09-02', '2024-09-02', 328.00, 1, 328.00, 171947, 172001, 'Ödendi', 'Tamamlandı', '2025-01-06 10:44:52', '2025-01-06 10:47:30'),
(195, 62, 4, 2, '2024-09-01', '2024-09-05', '2024-09-05', 449.00, 4, 2245.00, 197640, 197976, 'Ödendi', 'Tamamlandı', '2025-01-06 10:44:52', '2025-01-06 10:44:53'),
(196, 62, 4, 7, '2024-07-20', '2024-07-23', '2024-07-23', 449.00, 3, 2245.00, 197640, 198258, 'Ödendi', 'Tamamlandı', '2025-01-06 10:44:52', '2025-01-06 10:47:30'),
(197, 61, 4, 8, '2024-08-11', '2024-08-17', '2024-08-17', 445.00, 6, 3115.00, 101345, 102113, 'Ödendi', 'Tamamlandı', '2025-01-06 10:44:52', '2025-01-06 10:47:30'),
(198, 60, 4, 2, '2024-11-08', '2024-11-13', '2024-11-13', 569.00, 5, 3983.00, 179371, 180236, 'Ödendi', 'Tamamlandı', '2025-01-06 10:44:52', '2025-01-06 10:44:53'),
(199, 56, 4, 7, '2024-11-01', '2024-11-07', '2024-11-07', 435.00, 6, 1740.00, 174921, 176313, 'Ödendi', 'Tamamlandı', '2025-01-06 10:44:52', '2025-01-06 10:47:30'),
(200, 55, 4, 8, '2024-08-26', '2024-08-31', '2024-08-31', 546.00, 5, 3276.00, 31666, 32616, 'Ödendi', 'Tamamlandı', '2025-01-06 10:44:52', '2025-01-06 10:47:30'),
(201, 54, 4, 2, '2024-11-16', '2024-11-19', '2024-11-19', 273.00, 3, 1911.00, 161662, 162277, 'Ödendi', 'Tamamlandı', '2025-01-06 10:44:52', '2025-01-06 10:44:53'),
(202, 54, 4, 7, '2024-08-20', '2024-08-24', '2024-08-24', 273.00, 4, 819.00, 161662, 162486, 'Ödendi', 'Tamamlandı', '2025-01-06 10:44:52', '2025-01-06 10:47:30'),
(203, 54, 4, 8, '2024-10-19', '2024-10-22', '2024-10-22', 273.00, 3, 1092.00, 161662, 162151, 'Ödendi', 'Tamamlandı', '2025-01-06 10:44:52', '2025-01-06 10:47:30'),
(204, 53, 4, 2, '2024-08-16', '2024-08-22', '2024-08-22', 925.00, 6, 3700.00, 114955, 115861, 'Ödendi', 'Tamamlandı', '2025-01-06 10:44:52', '2025-01-06 10:44:53'),
(205, 53, 4, 7, '2024-11-08', '2024-11-11', '2024-11-11', 925.00, 3, 3700.00, 114955, 115600, 'Ödendi', 'Tamamlandı', '2025-01-06 10:44:52', '2025-01-06 10:47:30'),
(206, 52, 4, 8, '2024-12-27', '2024-12-31', '2024-12-31', 905.00, 4, 6335.00, 56057, 56741, 'Ödendi', 'Tamamlandı', '2025-01-06 10:44:52', '2025-01-06 10:47:30'),
(207, 52, 4, 2, '2024-11-21', '2024-11-23', '2024-11-23', 905.00, 2, 2715.00, 56057, 56381, 'Ödendi', 'Tamamlandı', '2025-01-06 10:44:52', '2025-01-06 10:44:53'),
(208, 51, 4, 7, '2024-09-07', '2024-09-10', '2024-09-10', 938.00, 3, 5628.00, 21760, 22495, 'Ödendi', 'Tamamlandı', '2025-01-06 10:44:52', '2025-01-06 10:47:30'),
(209, 50, 4, 8, '2024-09-12', '2024-09-13', '2024-09-13', 697.00, 1, 2788.00, 180546, 180638, 'Ödendi', 'Tamamlandı', '2025-01-06 10:44:52', '2025-01-06 10:47:30'),
(210, 50, 4, 2, '2024-12-29', '2025-01-04', '2025-01-04', 697.00, 6, 4182.00, 180546, 181008, 'Ödendi', 'Tamamlandı', '2025-01-06 10:44:52', '2025-01-06 10:44:53'),
(211, 72, 5, 7, '2024-10-11', '2024-10-14', '2024-10-14', 874.00, 3, 1748.00, 193540, 193711, 'Ödendi', 'Tamamlandı', '2025-01-06 10:44:52', '2025-01-06 10:47:30'),
(212, 71, 5, 8, '2024-09-19', '2024-09-25', '2024-09-25', 326.00, 6, 326.00, 13719, 14955, 'Ödendi', 'Tamamlandı', '2025-01-06 10:44:52', '2025-01-06 10:47:30'),
(213, 71, 5, 2, '2024-11-10', '2024-11-17', '2024-11-17', 326.00, 7, 978.00, 13719, 15175, 'Ödendi', 'Tamamlandı', '2025-01-06 10:44:52', '2025-01-06 10:44:53'),
(214, 70, 5, 7, '2024-08-20', '2024-08-26', '2024-08-26', 774.00, 6, 4644.00, 85957, 87007, 'Ödendi', 'Tamamlandı', '2025-01-06 10:44:52', '2025-01-06 10:47:30'),
(215, 67, 5, 8, '2024-11-10', '2024-11-16', '2024-11-16', 616.00, 6, 3080.00, 185722, 186928, 'Ödendi', 'Tamamlandı', '2025-01-06 10:44:52', '2025-01-06 10:47:30'),
(216, 66, 5, 2, '2024-11-16', '2024-11-19', '2024-11-19', 328.00, 3, 656.00, 171947, 172643, 'Ödendi', 'Tamamlandı', '2025-01-06 10:44:52', '2025-01-06 10:44:53'),
(217, 65, 5, 7, '2024-10-14', '2024-10-16', '2024-10-16', 817.00, 2, 4085.00, 101838, 102046, 'Ödendi', 'Tamamlandı', '2025-01-06 10:44:52', '2025-01-06 10:47:30'),
(218, 63, 5, 8, '2024-09-29', '2024-10-06', '2024-10-06', 781.00, 7, 3905.00, 15691, 16930, 'Ödendi', 'Tamamlandı', '2025-01-06 10:44:52', '2025-01-06 10:47:30'),
(219, 62, 5, 2, '2024-10-06', '2024-10-13', '2024-10-13', 449.00, 7, 3143.00, 197640, 198508, 'Ödendi', 'Tamamlandı', '2025-01-06 10:44:52', '2025-01-06 10:44:53'),
(220, 62, 5, 7, '2024-09-09', '2024-09-15', '2024-09-15', 449.00, 6, 3143.00, 197640, 199062, 'Ödendi', 'Tamamlandı', '2025-01-06 10:44:52', '2025-01-06 10:47:30'),
(221, 59, 5, 8, '2024-12-20', '2024-12-27', '2024-12-27', 588.00, 7, 588.00, 83534, 84682, 'Ödendi', 'Tamamlandı', '2025-01-06 10:44:52', '2025-01-06 10:47:30'),
(222, 57, 5, 2, '2024-09-14', '2024-09-15', '2024-09-15', 726.00, 1, 726.00, 37541, 37600, 'Ödendi', 'Tamamlandı', '2025-01-06 10:44:52', '2025-01-06 10:44:53'),
(223, 57, 5, 7, '2024-10-02', '2024-10-08', '2024-10-08', 726.00, 6, 3630.00, 37541, 38459, 'Ödendi', 'Tamamlandı', '2025-01-06 10:44:52', '2025-01-06 10:47:30'),
(224, 56, 5, 8, '2024-07-17', '2024-07-20', '2024-07-20', 435.00, 3, 1305.00, 174921, 175344, 'Ödendi', 'Tamamlandı', '2025-01-06 10:44:52', '2025-01-06 10:47:30'),
(225, 55, 5, 2, '2024-08-27', '2024-08-28', '2024-08-28', 546.00, 1, 2184.00, 31666, 31859, 'Ödendi', 'Tamamlandı', '2025-01-06 10:44:52', '2025-01-06 10:44:53'),
(226, 54, 5, 7, '2024-07-19', '2024-07-23', '2024-07-23', 273.00, 4, 819.00, 161662, 162042, 'Ödendi', 'Tamamlandı', '2025-01-06 10:44:52', '2025-01-06 10:47:30'),
(227, 51, 5, 8, '2024-12-05', '2024-12-11', '2024-12-11', 938.00, 6, 6566.00, 21760, 23230, 'Ödendi', 'Tamamlandı', '2025-01-06 10:44:52', '2025-01-06 10:47:30'),
(228, 49, 5, 2, '2024-10-10', '2024-10-15', '2024-10-15', 529.00, 5, 3174.00, 82935, 83395, 'Ödendi', 'Tamamlandı', '2025-01-06 10:44:52', '2025-01-06 10:44:53'),
(229, 72, 6, 7, '2024-07-13', '2024-07-14', '2024-07-14', 874.00, 1, 6118.00, 193540, 193617, 'Ödendi', 'Tamamlandı', '2025-01-06 10:44:52', '2025-01-06 10:47:30'),
(257, 63, 25, 1, '2025-01-06', '2025-01-10', '2025-01-06', 781.00, 4, 3124.00, 15691, 16947, 'Ödendi', 'Tamamlandı', '2025-01-06 11:29:49', '2025-01-06 11:29:58'),
(260, 74, 25, 1, '2025-01-12', '2025-01-19', '2025-01-12', 0.00, 7, 0.00, 521, 1200, 'Ödendi', 'Tamamlandı', '2025-01-12 16:03:38', '2025-01-12 16:03:46'),
(261, 68, 27, 1, '2025-01-13', '2025-01-31', NULL, 447.00, 18, 8046.00, 7856, NULL, NULL, 'Aktif', '2025-01-13 08:42:44', NULL),
(262, 77, 27, 1, '2025-01-13', '2025-01-20', '2025-01-13', 0.00, 7, 0.00, 0, 1000, 'Ödendi', 'Tamamlandı', '2025-01-13 11:25:27', '2025-01-13 11:26:29'),
(263, 69, 25, 1, '2025-01-13', '2025-01-22', '2025-01-13', 0.00, 9, 0.00, 25455, 26500, 'Ödendi', 'Tamamlandı', '2025-01-13 11:27:29', '2025-01-13 11:28:00'),
(264, 69, 25, 1, '2025-01-13', '2025-01-22', NULL, 0.00, 9, 0.00, 25455, NULL, NULL, 'Aktif', '2025-01-13 11:27:29', NULL);

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `musteriler`
--

DROP TABLE IF EXISTS `musteriler`;
CREATE TABLE IF NOT EXISTS `musteriler` (
  `id` int NOT NULL AUTO_INCREMENT,
  `ad` varchar(50) CHARACTER SET utf8mb3 COLLATE utf8mb3_turkish_ci DEFAULT NULL,
  `soyad` varchar(50) CHARACTER SET utf8mb3 COLLATE utf8mb3_turkish_ci DEFAULT NULL,
  `tc_no` varchar(11) CHARACTER SET utf8mb3 COLLATE utf8mb3_turkish_ci DEFAULT NULL,
  `telefon` varchar(15) CHARACTER SET utf8mb3 COLLATE utf8mb3_turkish_ci DEFAULT NULL,
  `email` varchar(100) CHARACTER SET utf8mb3 COLLATE utf8mb3_turkish_ci DEFAULT NULL,
  `ehliyet_sinifi` varchar(5) CHARACTER SET utf8mb3 COLLATE utf8mb3_turkish_ci DEFAULT NULL,
  `adres` text CHARACTER SET utf8mb3 COLLATE utf8mb3_turkish_ci,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=28 DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_turkish_ci;

--
-- Tablo döküm verisi `musteriler`
--

INSERT INTO `musteriler` (`id`, `ad`, `soyad`, `tc_no`, `telefon`, `email`, `ehliyet_sinifi`, `adres`, `created_at`, `updated_at`) VALUES
(1, 'Ahmet', 'Yılmaz', '12345678901', '5321234567', 'ahmet.yilmaz@email.com', 'B', 'Karşıyaka Mah. 1234 Sok. No:1 İzmir', '2025-01-06 10:24:52', NULL),
(2, 'Mehmet', 'Kaya', '23456789012', '5332345678', 'mehmet.kaya@email.com', 'B', 'Bornova Mah. 567 Sok. No:12 İzmir', '2025-01-06 10:24:52', NULL),
(3, 'Ayşe', 'Demir', '34567890123', '5343456789', 'ayse.demir@email.com', 'B', 'Alsancak Mah. 890 Sok. No:5 İzmir', '2025-01-06 10:24:52', NULL),
(4, 'Fatma', 'Çelik', '45678901234', '5354567890', 'fatma.celik@email.com', 'B', 'Konak Mah. 123 Sok. No:8 İzmir', '2025-01-06 10:24:52', NULL),
(5, 'Ali', 'Şahin', '56789012345', '5365678901', 'ali.sahin@email.com', 'BE', 'Buca Mah. 456 Sok. No:15 İzmir', '2025-01-06 10:24:52', NULL),
(6, 'Zeynep', 'Öztürk', '67890123456', '5376789012', 'zeynep.ozturk@email.com', 'B', 'Gaziemir Mah. 789 Sok. No:3 İzmir', '2025-01-06 10:24:52', NULL),
(7, 'Mustafa', 'Aydın', '78901234567', '5387890123', 'mustafa.aydin@email.com', 'B', 'Çiğli Mah. 234 Sok. No:7 İzmir', '2025-01-06 10:24:52', NULL),
(8, 'Emine', 'Yıldız', '89012345678', '5398901234', 'emine.yildiz@email.com', 'B', 'Bayraklı Mah. 567 Sok. No:9 İzmir', '2025-01-06 10:24:52', NULL),
(9, 'Hüseyin', 'Arslan', '90123456789', '5309012345', 'huseyin.arslan@email.com', 'BE', 'Karabağlar Mah. 890 Sok. No:11 İzmir', '2025-01-06 10:24:52', NULL),
(10, 'Hatice', 'Güneş', '01234567890', '5310123456', 'hatice.gunes@email.com', 'B', 'Narlıdere Mah. 123 Sok. No:14 İzmir', '2025-01-06 10:24:52', NULL),
(11, 'İbrahim', 'Kurt', '12345098765', '5321234098', 'ibrahim.kurt@email.com', 'B', 'Balçova Mah. 456 Sok. No:16 İzmir', '2025-01-06 10:24:52', NULL),
(12, 'Sevim', 'Yalçın', '23456109876', '5332345109', 'sevim.yalcin@email.com', 'B', 'Güzelbahçe Mah. 789 Sok. No:18 İzmir', '2025-01-06 10:24:52', NULL),
(13, 'Murat', 'Erdoğan', '34567210987', '5343456210', 'murat.erdogan@email.com', 'BE', 'Urla Mah. 234 Sok. No:20 İzmir', '2025-01-06 10:24:52', NULL),
(14, 'Elif', 'Korkmaz', '45678321098', '5354567321', 'elif.korkmaz@email.com', 'B', 'Seferihisar Mah. 567 Sok. No:22 İzmir', '2025-01-06 10:24:52', NULL),
(15, 'Hasan', 'Özer', '56789432109', '5365678432', 'hasan.ozer@email.com', 'B', 'Menderes Mah. 890 Sok. No:24 İzmir', '2025-01-06 10:24:52', NULL),
(16, 'Aysel', 'Koç', '67890543210', '5376789543', 'aysel.koc@email.com', 'B', 'Torbalı Mah. 123 Sok. No:26 İzmir', '2025-01-06 10:24:52', NULL),
(17, 'Osman', 'Özdemir', '78901654321', '5387890654', 'osman.ozdemir@email.com', 'BE', 'Kemalpaşa Mah. 456 Sok. No:28 İzmir', '2025-01-06 10:24:52', NULL),
(18, 'Fadime', 'Şen', '89012765432', '5398901765', 'fadime.sen@email.com', 'B', 'Foça Mah. 789 Sok. No:30 İzmir', '2025-01-06 10:24:52', NULL),
(19, 'Mehmet Ali', 'Yalın', '90123876543', '5309012876', 'mehmetali.yalin@email.com', 'B', 'Aliağa Mah. 234 Sok. No:32 İzmir', '2025-01-06 10:24:52', NULL),
(20, 'Sema', 'Aktaş', '01234987654', '5310123987', 'sema.aktas@email.com', 'B', 'Menemen Mah. 567 Sok. No:34 İzmir', '2025-01-06 10:24:52', NULL),
(21, 'Kemal', 'Aslan', '12345678902', '5321234568', 'kemal.aslan@email.com', 'BE', 'Bergama Mah. 890 Sok. No:36 İzmir', '2025-01-06 10:24:52', NULL),
(22, 'Zehra', 'Tekin', '23456789013', '5332345679', 'zehra.tekin@email.com', 'B', 'Dikili Mah. 123 Sok. No:38 İzmir', '2025-01-06 10:24:52', NULL),
(23, 'Yaşar', 'Bulut', '34567890124', '5343456780', 'yasar.bulut@email.com', 'B', 'Kınık Mah. 456 Sok. No:40 İzmir', '2025-01-06 10:24:52', NULL),
(24, 'Hacer', 'Yavuz', '45678901235', '5354567891', 'hacer.yavuz@email.com', 'B', 'Kiraz Mah. 789 Sok. No:42 İzmir', '2025-01-06 10:24:52', NULL),
(25, 'Recep', 'Çetin', '56789012346', '5365678902', 'recep.cetin@email.com', 'BE', 'Beydağ Mah. 234 Sok. No:44 İzmir', '2025-01-06 10:24:52', NULL),
(27, 'Mehmet', 'Yıldız', '100000016', '5555555558', 'm.yildiz@example.com', 'C', 'Atatürk mahallesi, 345.sokak,No:2 İzmir/Bornova', '2025-01-13 08:41:51', NULL);

-- --------------------------------------------------------

--
-- Görünüm yapısı `istatistikler`
--
DROP TABLE IF EXISTS `istatistikler`;

DROP VIEW IF EXISTS `istatistikler`;
CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `istatistikler`  AS SELECT (select count(0) from `araclar` where (`araclar`.`durum` = 'Müsait')) AS `musait_arac_sayisi`, (select count(0) from `araclar` where (`araclar`.`durum` = 'Kirada')) AS `kiradaki_arac_sayisi`, (select count(0) from `araclar` where (`araclar`.`durum` = 'Bakımda')) AS `bakimdaki_arac_sayisi`, (select count(0) from `musteriler`) AS `toplam_musteri_sayisi`, (select count(0) from `kiralamalar` where (`kiralamalar`.`durum` = 'Aktif')) AS `aktif_kiralama_sayisi`, (select sum(`kiralamalar`.`toplam_ucret`) from `kiralamalar` where (month(`kiralamalar`.`created_at`) = month(curdate()))) AS `aylik_ciro` ;

--
-- Dökümü yapılmış tablolar için kısıtlamalar
--

--
-- Tablo kısıtlamaları `bakimlar`
--
ALTER TABLE `bakimlar`
  ADD CONSTRAINT `bakimlar_ibfk_1` FOREIGN KEY (`arac_id`) REFERENCES `araclar` (`id`);

--
-- Tablo kısıtlamaları `hasarlar`
--
ALTER TABLE `hasarlar`
  ADD CONSTRAINT `hasarlar_ibfk_1` FOREIGN KEY (`kiralama_id`) REFERENCES `kiralamalar` (`id`);

--
-- Tablo kısıtlamaları `kiralamalar`
--
ALTER TABLE `kiralamalar`
  ADD CONSTRAINT `fk_kiralama_arac` FOREIGN KEY (`arac_id`) REFERENCES `araclar` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_kiralama_calisan` FOREIGN KEY (`calisan_id`) REFERENCES `calisanlar` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_kiralama_musteri` FOREIGN KEY (`musteri_id`) REFERENCES `musteriler` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
