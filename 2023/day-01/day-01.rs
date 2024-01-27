use std::fs;

fn main() {
    if let Ok(file_content) = readfile("input.txt") {
        println!("Part 1: {}",cal_sum(&file_content, false));
        println!("Part 2: {}",cal_sum(&file_content, true));
    } else {
        println!("Could not read file");
    }
}

fn readfile(filepath: &str) -> Result<String, Box<dyn std::error::Error>> {
    let file_content = fs::read_to_string(filepath)?;
    Ok(file_content)
}

fn cal_sum(file_content: &str, use_spelled_digits: bool) -> u32 {
    let mut lines = file_content.split('\n');
    let mut sum: u32 = 0;
    while let Some(line) = lines.next() {
        sum += cal_value(line, use_spelled_digits);
    }
    sum
}

fn cal_value(line: &str, use_spelled_digits: bool) -> u32 {
    let mut chars = line.chars();
    let mut first_digit: u32 = 0;
    let mut last_digit: u32 = 0;
    let mut i: usize = 0;
    while let Some(ch) = chars.next() {
        if let Some(digit) = ch.to_digit(10) {
            if first_digit == 0 {first_digit = digit}
            last_digit = digit;
        } else if use_spelled_digits {
            if let Some(digit) = word_to_digit(&line,i) {
                if first_digit == 0 {first_digit = digit}
                last_digit = digit;
            }
        }
        i += 1;
    }
    first_digit * 10 + last_digit
}

fn word_to_digit(line: &str, position: usize) -> Option<u32> {
    let digits: [&str; 9] = ["one","two","three","four","five","six","seven","eight","nine"];
    for i in 0..9 {
        let digit = digits[i];
        if let Some(slice) = line.get(position..position + digit.len()) {
            if slice == digit {return Some((i + 1) as u32);}
        }
    }
    None
}