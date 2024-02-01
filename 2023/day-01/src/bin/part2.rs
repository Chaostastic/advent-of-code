const DIGITS_STR: [&str; 9] = ["one","two","three","four","five","six","seven","eight","nine"];

fn main() {
    let input = include_str!("./input.txt");
    println!("{}",process(&input));
}

fn process(input: &str) -> u32 {
    input.split('\n').map(cal_value).sum()
}

fn cal_value(line: &str) -> u32 {
    let mut first_digit: u32 = 0;
    let mut last_digit: u32 = 0;
    for (i, ch) in line.chars().enumerate() {
        if let Some(digit) = ch.to_digit(10) {
            if first_digit == 0 {first_digit = digit}
            last_digit = digit;
        } else {
            let line_remaining = line.get(i..).unwrap();
            if let Some(digit) = word_to_digit(line_remaining) {
                if first_digit == 0 {first_digit = digit}
                last_digit = digit;
            }
        }
    }
    first_digit * 10 + last_digit
}

fn word_to_digit(line: &str) -> Option<u32> {
    for (i, &digit_str) in DIGITS_STR.iter().enumerate() {
        if let Some(slice) = line.get(..digit_str.len()) {
            if slice == digit_str {
                return Some((i + 1) as u32);
            }
        }
    }
    None
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn it_works() {
        let result = process(
            "two1nine
            eightwothree
            abcone2threexyz
            xtwone3four
            4nineeightseven2
            zoneight234
            7pqrstsixteen"
        );
        assert_eq!(result, 281);
    }
}