# Enhaced additional capabilities

## Step 1:
Take the code from the previous task and we will add the additional capabilities here.
### Exponential:
The given JavaScript function expo calculates the exponentiation of a number (n1) raised to the power of another number (n2). It uses a loop to multiply n1 by itself n2 times. The function initializes a result variable to 1 and iterates from 0 to Math.abs(n2) - 1, multiplying result by n1 in each iteration. This ensures that even if n2 is negative, the loop executes the correct number of times. Finally, if n2 is negative, the function returns the reciprocal (1 / result) to correctly handle negative exponents; otherwise, it returns the computed power. This implementation effectively mimics the behavior of Math.pow(n1, n2) without using built-in functions.
### Square root:
Logic:
The square root of a number is just the number which when multiplied by itself gives the first number. So 2 is the square root of 4 because 2 * 2 = 4.
Start with the number you want to find the square root of. Let's use 12. 
There are three steps:
Guess Divide Averagen and then just keep repeating steps 2 and 3.
First, start by guessing a square root value. It helps if your guess is a good one but it will work even if it is a terrible guess. We will guess that 2 is the square root of 12.
In step two, we divide 12 by our guess of 2 and we get 6.
In step three, we average 6 and 2: (6+2)/2 = 4
Now we repeat step two with the new guess of 4. So 12/4 = 3
Now average 4 and 3: (4+3)/2 = 3.5
Repeat step two: 12/3.5 = 3.43
Average: (3.5 + 3.43)/2 = 3.465
We could keep doing this, getting a better and better approximation but let's stop here. 
### Modulo:
The given JavaScript function mod calculates the remainder of the division between two numbers, n1 and n2, using the modulus operator (%). It takes two parameters and returns the remainder when n1 is divided by n2. This function effectively replicates the behavior of the modulus operator, which is useful in scenarios such as determining whether a number is even or odd, cycling through values in a loop, or handling periodic calculations. For example, mod(10, 3) returns 1 because 10 ÷ 3 has a remainder of 1.
## Step 2:
Now after we do the modification we can just push the code to the git hub as we did for the previous task.