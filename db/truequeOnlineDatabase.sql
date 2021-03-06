-- MySQL Workbench Forward Engineering



-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
-- -----------------------------------------------------
-- Schema truequeOnline
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema truequeOnline
-- -----------------------------------------------------
CREATE DATABASE IF NOT EXISTS `truequeOnline` DEFAULT CHARACTER SET latin1 ;
USE `truequeOnline` ;

-- -----------------------------------------------------
-- Table `truequeOnline`.`users`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `truequeOnline`.`users` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(50) NOT NULL,
  `lastName` VARCHAR(50) NOT NULL,
  `email` VARCHAR(75) NOT NULL,
  `password` VARCHAR(61) NOT NULL,
  `avatar` VARCHAR(200) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `email_UNIQUE` (`email` ASC) )
ENGINE = InnoDB
DEFAULT CHARACTER SET = latin1;


-- -----------------------------------------------------
-- Table `truequeOnline`.`cart`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `truequeOnline`.`cart` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `users_id` INT(11) NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_cart_users1_idx` (`users_id` ASC) ,
  CONSTRAINT `fk_cart_users1`
    FOREIGN KEY (`users_id`)
    REFERENCES `truequeOnline`.`users` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = latin1;


-- -----------------------------------------------------
-- Table `truequeOnline`.`products`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `truequeOnline`.`products` (
  `id` INT(15) NOT NULL AUTO_INCREMENT,
  `productName` VARCHAR(150) NOT NULL,
  `productPrice` INT(11) NOT NULL,
  `listCategoriesProduct` VARCHAR(20) NOT NULL,
  `productDescriptionUpload` VARCHAR(1500) NOT NULL,
  `aimUpload` VARCHAR(9) NOT NULL,
  `active` TINYINT(1) NOT NULL,
  `categoryExchange` VARCHAR(20) NULL DEFAULT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = latin1;


-- -----------------------------------------------------
-- Table `truequeOnline`.`cart_has_products`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `truequeOnline`.`cart_has_products` (
  `quantity` INT(3) NOT NULL,
  `cart_id` INT(11) NOT NULL,
  `products_id` INT(15) NOT NULL,
  INDEX `fk_cart_has_products_cart1_idx` (`cart_id` ASC) ,
  INDEX `fk_cart_has_products_products1_idx` (`products_id` ASC) ,
  CONSTRAINT `fk_cart_has_products_cart1`
    FOREIGN KEY (`cart_id`)
    REFERENCES `truequeOnline`.`cart` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_cart_has_products_products1`
    FOREIGN KEY (`products_id`)
    REFERENCES `truequeOnline`.`products` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = latin1;


-- -----------------------------------------------------
-- Table `truequeOnline`.`details`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `truequeOnline`.`details` (
  `id` INT(18) NOT NULL AUTO_INCREMENT,
  `color` VARCHAR(45) NULL DEFAULT NULL,
  `amount` TINYINT(3) NULL DEFAULT NULL,
  `products_id` INT(15) NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_details_products_idx` (`products_id` ASC) ,
  CONSTRAINT `fk_details_products`
    FOREIGN KEY (`products_id`)
    REFERENCES `truequeOnline`.`products` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = latin1;


-- -----------------------------------------------------
-- Table `truequeOnline`.`images`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `truequeOnline`.`images` (
  `id` INT(18) NOT NULL AUTO_INCREMENT,
  `path` VARCHAR(200) NOT NULL,
  `type` VARCHAR(45) NULL DEFAULT NULL,
  `products_id` INT(15) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `path_UNIQUE` (`path` ASC) ,
  INDEX `fk_images_products1_idx` (`products_id` ASC) ,
  CONSTRAINT `fk_images_products1`
    FOREIGN KEY (`products_id`)
    REFERENCES `truequeOnline`.`products` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = latin1;


-- -----------------------------------------------------
-- Table `truequeOnline`.`users_has_products`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `truequeOnline`.`users_has_products` (
  `relation` VARCHAR(45) NOT NULL,
  `products_id` INT(15) NOT NULL,
  `users_id` INT(11) NOT NULL,
  INDEX `fk_users_has_products_products1_idx` (`products_id` ASC) ,
  INDEX `fk_users_has_products_users1_idx` (`users_id` ASC) ,
  CONSTRAINT `fk_users_has_products_products1`
    FOREIGN KEY (`products_id`)
    REFERENCES `truequeOnline`.`products` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_users_has_products_users1`
    FOREIGN KEY (`users_id`)
    REFERENCES `truequeOnline`.`users` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = latin1;


