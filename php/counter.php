<?php
     $filename = "../counter.txt";
     $count = file_get_contents($filename);
     $countCheck = file_get_contents($filename);
     $count++;
     if ($count < $countCheck) {
         $count = $countCheck;
         $count++;
     }
     $handle = fopen($filename, "w+");
     fwrite($handle, $count);
     fclose($handle);
     echo $count;
?>
