#include <stdio.h>
#include <stdbool.h>
#define MAX_LINE_LENGTH 100

int stringLength(char* string);
int toDigit(char *string, int position, bool includeText);
int calibration(char *line, bool includeText);
int sum(char *filename, bool includeText);

int main(void) {
    printf("Part 1: %d\n", sum("input.txt", false));
    printf("Part 2: %d\n", sum("input.txt", true));
}

int sum(char *filename, bool includeText) {
    FILE *file = fopen(filename, "r");

    char line[MAX_LINE_LENGTH];
    int sum = 0;
    while (fgets(line, MAX_LINE_LENGTH, file)) {
        sum += calibration(line, includeText);
    }
    return sum;

    fclose(file);
}

int stringLength(char* string) {
    int i = 0;
    while (string[i] != '\0') {
        ++i;
    }
    return i;
}

int toDigit(char *string, int position, bool includeText) {
    char ch = string[position];
    if (ch >= '1' && ch <= '9') {
        return ch - '0';
    }
    if (!includeText) return -1;
    char *digits[] = {"one","two","three","four","five","six","seven","eight","nine"};
    for (int i = 0; i < 9; ++i) {
        int length = stringLength(digits[i]);
        bool doesMatch = true;
        for (int j = 0; j < length; ++j) {
            if (digits[i][j] != string[position + j]) {
                doesMatch = false;
                break;
            }
        }
        if (doesMatch) return i + 1;
    }
    return -1;
}

int calibration(char *line, bool includeText) {
    int firstDigit = 0;
    int lastDigit;
    int length = stringLength(line);
    for (int i = 0; i < length; ++i) {
        int digit = toDigit(line,i,includeText);
        if (digit == -1) continue;
        if (firstDigit == 0) {
            firstDigit = digit;
        }
        lastDigit = digit;
    }
    return firstDigit * 10 + lastDigit;
}