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
    for ch in line.chars() {
        if let Some(digit) = ch.to_digit(10) {
            if first_digit == 0 {first_digit = digit}
            last_digit = digit;
        }
    }
    first_digit * 10 + last_digit
}


#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn it_works() {
        let result = process(
            "1abc2
            pqr3stu8vwx
            a1b2c3d4e5f
            treb7uchet"
        );
        assert_eq!(result, 142);
    }
}