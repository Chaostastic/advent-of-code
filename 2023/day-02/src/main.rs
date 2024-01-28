use std::fs;

struct Set {
    red: u32,
    green: u32,
    blue: u32,
}

fn main() {
    if let Ok(file_content) = readfile("./input.txt") {
        let games = create_games(&file_content);
        println!("Part 1: {}",id_sum(&games));
    } else {
        println!("Could not read file");
    }
}

fn readfile(filepath: &str) -> Result<String, Box<dyn std::error::Error>> {
    let file_content = fs::read_to_string(filepath)?;
    Ok(file_content)
}

fn create_games(file_content: &str) -> [Vec<Set>; 100] {
    const NEW_VEC: Vec<Set> = Vec::new();
    let mut games: [Vec<Set>; 100] = [NEW_VEC; 100];
    let mut lines = file_content.split('\n');
    let mut i = 0;
    while let Some(line) = lines.next() {
        let mut sets_str = line.split(": ").last().unwrap().split("; ");
        while let Some(set_str) = sets_str.next() {
            let mut set = Set {red: 0, green: 0, blue: 0};
            let mut cubes_str = set_str.split(", ");
            while let Some(cube_str) = cubes_str.next() {
                let mut it = cube_str.split(' ');
                let count = it.next().unwrap().parse().unwrap();
                let color = it.next().unwrap();
                match color {
                    "red" => set.red = count,
                    "green" => set.green = count,
                    "blue" => set.blue = count,
                    _ => println!("{} is not a valid color.",color),
                }
            }
            games[i].push(set);
        }
        i += 1;
    }
    games
}

fn id_sum(games: &[Vec<Set>; 100]) -> u32 {
    let mut sum: u32 = 0;
    let mut id: u32 = 1;
    for game in games {
        let mut possible: bool = true;
        for set in game {
            if set.red > 12 || set.green > 13 || set.blue > 14 {
                possible = false;
                break;
            }
        }
        if possible {sum += id}
        id += 1;
    }
    sum
}