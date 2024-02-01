struct Set {
    red: u32,
    green: u32,
    blue: u32,
}

fn main() {
    let input = include_str!("./input.txt");
    println!("{}",process(&input));
}

fn process(input: &str) -> u32 {
    input.split('\n').map(power).sum()
}

fn power (line: &str) -> u32 {
    let game = line.split(": ").last().unwrap().split("; ").map(new_set);
    let mut minimum = Set {red: 0, green: 0, blue: 0};
    for set in game {
        if set.red > minimum.red {minimum.red = set.red}
        if set.green > minimum.green {minimum.green = set.green}
        if set.blue > minimum.blue {minimum.blue = set.blue}
    }
    minimum.red * minimum.green * minimum.blue
}

fn new_set (set_str: &str) -> Set {
    let mut set = Set {red: 0, green: 0, blue: 0};
    set_str.split(", ").for_each(|cubes| {
        let mut it = cubes.split(' ');
        let count = it.next().unwrap().parse().unwrap();
        let color = it.next().unwrap();
        match color {
            "red" => set.red = count,
            "green" => set.green = count,
            "blue" => set.blue = count,
            _ => println!("{} is not a valid color.",color),
        }
    });
    set
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn it_works() {
        let result = process(
            "Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green
            Game 2: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue
            Game 3: 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red
            Game 4: 1 green, 3 red, 6 blue; 3 green, 6 red; 3 green, 15 blue, 14 red
            Game 5: 6 red, 1 blue, 3 green; 2 blue, 1 red, 2 green"
        );
        assert_eq!(result, 2286);
    }
}