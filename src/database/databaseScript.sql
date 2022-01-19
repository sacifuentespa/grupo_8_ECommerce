-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
-- -----------------------------------------------------
-- Schema movies_db
-- -----------------------------------------------------
-- -----------------------------------------------------
-- Schema truequeOnline
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema truequeOnline
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `truequeOnline` DEFAULT CHARACTER SET latin1 ;
USE `truequeOnline` ;

-- -----------------------------------------------------
-- Table `truequeOnline`.`users`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `truequeOnline`.`users` (
  `idUser` INT(11) NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(50) NOT NULL,
  `lastName` VARCHAR(50) NOT NULL,
  `email` VARCHAR(75) NOT NULL,
  `password` VARCHAR(61) NOT NULL,
  `avatar` VARCHAR(200) NOT NULL,
  PRIMARY KEY (`idUser`),
  UNIQUE INDEX `email_UNIQUE` (`email` ASC) )
ENGINE = InnoDB
DEFAULT CHARACTER SET = latin1;


-- -----------------------------------------------------
-- Table `truequeOnline`.`cart`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `truequeOnline`.`cart` (
  `idCart` INT(11) NOT NULL,
  `users_idUser` INT(11) NOT NULL,
  PRIMARY KEY (`idCart`, `users_idUser`),
  INDEX `fk_cart_users1_idx` (`users_idUser` ASC) ,
  CONSTRAINT `fk_cart_users1`
    FOREIGN KEY (`users_idUser`)
    REFERENCES `truequeOnline`.`users` (`idUser`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = latin1;


-- -----------------------------------------------------
-- Table `truequeOnline`.`products`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `truequeOnline`.`products` (
  `idProduct` INT(15) NOT NULL,
  `productName` VARCHAR(50) NOT NULL,
  `productPrice` INT(11) NOT NULL,
  `listCategoriesProduct` VARCHAR(15) NOT NULL,
  `productDescriptionUpload` VARCHAR(1000) NOT NULL,
  `aimUpload` VARCHAR(9) NOT NULL,
  `active` TINYINT(1) NOT NULL,
  `categoryExchange` VARCHAR(15) NULL DEFAULT NULL,
  PRIMARY KEY (`idProduct`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = latin1;


-- -----------------------------------------------------
-- Table `truequeOnline`.`cart_has_products`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `truequeOnline`.`cart_has_products` (
  `cart_idCart` INT(15) NOT NULL,
  `products_idProduct` INT(11) NOT NULL,
  `quantity` INT(3) NOT NULL,
  PRIMARY KEY (`cart_idCart`, `products_idProduct`, `quantity`),
  INDEX `fk_cart_has_products_products1_idx` (`products_idProduct` ASC) ,
  INDEX `fk_cart_has_products_cart1_idx` (`cart_idCart` ASC) ,
  CONSTRAINT `fk_cart_has_products_cart1`
    FOREIGN KEY (`cart_idCart`)
    REFERENCES `truequeOnline`.`cart` (`idCart`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_cart_has_products_products1`
    FOREIGN KEY (`products_idProduct`)
    REFERENCES `truequeOnline`.`products` (`idProduct`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = latin1;


-- -----------------------------------------------------
-- Table `truequeOnline`.`details`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `truequeOnline`.`details` (
  `idDetail` INT(18) NOT NULL,
  `color` VARCHAR(45) NULL DEFAULT NULL,
  `amount` TINYINT(3) NULL DEFAULT NULL,
  `products_idProduct` INT(15) NOT NULL,
  PRIMARY KEY (`idDetail`, `products_idProduct`),
  INDEX `fk_details_products1_idx` (`products_idProduct` ASC) ,
  CONSTRAINT `fk_details_products1`
    FOREIGN KEY (`products_idProduct`)
    REFERENCES `truequeOnline`.`products` (`idProduct`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = latin1;


-- -----------------------------------------------------
-- Table `truequeOnline`.`images`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `truequeOnline`.`images` (
  `idImage` INT(18) NOT NULL,
  `path` VARCHAR(200) NOT NULL,
  `products_idProduct` INT(15) NOT NULL,
  `type` VARCHAR(45) NULL DEFAULT NULL,
  PRIMARY KEY (`idImage`, `products_idProduct`),
  UNIQUE INDEX `path_UNIQUE` (`path` ASC) ,
  INDEX `fk_images_products1_idx` (`products_idProduct` ASC) ,
  CONSTRAINT `fk_images_products1`
    FOREIGN KEY (`products_idProduct`)
    REFERENCES `truequeOnline`.`products` (`idProduct`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = latin1;


-- -----------------------------------------------------
-- Table `truequeOnline`.`users_has_products`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `truequeOnline`.`users_has_products` (
  `users_idUser` INT(11) NOT NULL,
  `products_idProduct` INT(11) NOT NULL,
  `relation` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`users_idUser`, `products_idProduct`),
  INDEX `fk_users_has_products_products1_idx` (`products_idProduct` ASC) ,
  INDEX `fk_users_has_products_users1_idx` (`users_idUser` ASC) ,
  CONSTRAINT `fk_users_has_products_products1`
    FOREIGN KEY (`products_idProduct`)
    REFERENCES `truequeOnline`.`products` (`idProduct`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_users_has_products_users1`
    FOREIGN KEY (`users_idUser`)
    REFERENCES `truequeOnline`.`users` (`idUser`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = latin1;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;