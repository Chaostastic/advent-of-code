#include <stdio.h>

int part1(FILE *file) {
    char ch;
    int firstDigit = 0;
    int lastDigit;
    int sum = 0;
    while ((ch = fgetc(file)) != EOF) {
        if (ch >= '1' && ch <= '9') {
            int digit = ch - '0';
            if (firstDigit == 0) {
                firstDigit = digit;
            }
            lastDigit = digit;
        } else if (ch == '\n') {
            sum += firstDigit * 10 + lastDigit;
            firstDigit = 0;
        }
    }
    sum += firstDigit * 10 + lastDigit;
    return sum;
}

int main(void) {
    FILE *file = fopen("input.txt", "r");

    printf("Part 1: %d\n", part1(file));

    fclose(file);
}