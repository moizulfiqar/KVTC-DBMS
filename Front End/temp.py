import random, math, operator, re, sys
from bisect import bisect_left, bisect_right
from string import ascii_lowercase, ascii_uppercase
from collections import Counter, defaultdict, deque
from itertools import permutations, combinations, product, accumulate, repeat

inf, neg_inf, MOD = float('inf'), float('-inf'), 10**9 + 7
sum_form = lambda n: n * -~n // 2 # ~n == -(n+1)
pow2 = lambda n: n != 0 and (n & (n - 1)) == 0
perf_sqr = lambda n: n >= 0 and int(n**0.5)**2 == n
digit_sum = lambda n: sum(int(d) for d in str(abs(n)))
even, odd = lambda n: (n & 1) == 0, lambda n: not even(n)
quad_form = lambda a, b, c: ((-b + math.isqrt(b**2 - 4*a*c)) // (2*a))

E, F, L, P, R = enumerate, filter, len, print, range
inp = lambda: int(input())
inps = lambda: input().strip()
inpm = lambda: map(int, input().split())
inpl = lambda: list(map(int, input().split()))

LOCAL = False
try:
    import os
    if os.path.exists('input.txt'):
        LOCAL = True
        import time, tracemalloc
        sys.stdin = open('input.txt', 'r')
        start_time = time.time()
        tracemalloc.start()
except: pass

def main() -> None:
    for _ in R(inp()):
        pass

main()

if LOCAL:
    end_time = time.time()
    current, peak = tracemalloc.get_traced_memory()
    tracemalloc.stop()
    P("\n{:<8} {:>6.2f} s".format("Time:", end_time - start_time))
    P("{:<8} {:>6.2f} MB".format("Memory:", peak / (1024**2)))