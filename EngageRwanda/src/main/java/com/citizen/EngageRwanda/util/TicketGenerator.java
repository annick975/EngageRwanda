package com.citizen.EngageRwanda.util;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.Random;

public class TicketGenerator {

  public static String generateTicketId() {
    // Format: ER-YYYYMMDD-XXXXX where XXXXX is a random 5-digit number
    String datePart = LocalDate.now().format(DateTimeFormatter.ofPattern("yyyyMMdd"));
    String randomPart = String.format("%05d", new Random().nextInt(100000));

    return "ER-" + datePart + "-" + randomPart;
  }
}