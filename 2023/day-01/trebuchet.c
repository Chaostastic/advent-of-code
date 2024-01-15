#include <stdio.h>
#define MAX_LINE_LENGTH 50

int stringLength(char* string);
int getDigit(char *string, int position);
int getCalValue(char *line);

int part1(char *filename) {
    FILE *file = fopen(filename, "r");

    char line[MAX_LINE_LENGTH];
    int sum = 0;
    while (fgets(line, MAX_LINE_LENGTH, file)) {
        sum += getCalValue(line);
    }
    return sum;

    fclose(file);
}

int main(void) {
    printf("Part 1: %d\n", part1("input.txt"));
}

int stringLength(char* string) {
    int i = 0;
    while (string[i] != '\0') {
        ++i;
    }
    return i;
}

int getDigit(char *string, int position) {
    char ch = string[position];
    if (ch >= '1' && ch <= '9') {
        return ch - '0';
    }
    return -1;
}

int getCalValue(char *line) {
    int firstDigit = 0;
    int lastDigit;
    int length = stringLength(line);
    for (int i = 0; i < length; ++i) {
        int digit = getDigit(line,i);
        if (digit == -1) continue;
        if (firstDigit == 0) {
            firstDigit = digit;
        }
        lastDigit = digit;
    }
    return firstDigit * 10 + lastDigit;
}