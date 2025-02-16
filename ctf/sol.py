
lg = '''Take -1 of these, then
Take -4 of these, then
Take 0 of these, then
Take -1 of these, then
Take 1 of these, then
Take 1 of these, then
Take 3 of these, then
Take 2 of these, then
Take 2 of these, then
Take 3 of these, then
Take 3 of these, then
Take 8 of these, then
Take 11 of these, then
Take 12 of these, then
Take 12 of these, then
Take 13 of these, then
Take 14 of these, then
Take 15 of these, then
Take 14 of these, then
Take 16 of these, then
Take 15 of these, then
Take 15 of these, then
Take 14 of these, then
Take 17 of these, then
Take 19 of these, then
Take 19 of these, then
Take 19 of these, then
Take 19 of these, then
Take 20 of these, then
Take 20 of these, then
Take 19 of these, then
Take 25 of these, then
Take 27 of these, then
Take 28 of these, then
Take 28 of these, then
Take 26 of these, then
Take 28 of these, then
Take 28 of these, then
Take 28 of these, then
Take 28 of these, then
Take 26 of these, then
Take 27 of these, then
Take 25 of these, then
Take 27 of these, then
Take 26 of these, then
Take 28 of these, then
Take 28 of these, then
Take 27 of these, then
Take 28 of these, then
Take 26 of these, then
Take 32 of these, then
Take 31 of these, then
Take 30 of these, then
Take 31 of these, then
Take 31 of these, then
Take 30 of these, then
Take 31 of these, then
Take 30 of these, then
Take 30 of these, then
Take 29 of these, then
Take 28 of these, then
Take 29 of these, then
Take 31 of these, then
Take 28 of these, then
Take 27 of these, then
Take 28 of these, then
Take 29 of these, then
Take 29 of these, then
Take 31 of these, then
Take 33 of these, then
Take 33 of these, then
Take 32 of these, then
Take 32 of these, then
Take 32 of these, then
Take 32 of these, then
Take 32 of these, then
Take 29 of these, then
Take 32 of these, then
Take 33 of these, then
Take 32 of these, then
Take 32 of these, then
Take 28 of these, then
Take 32 of these, then
Take 30 of these, then
Take 31 of these, then
Take 30 of these, then
Take 30 of these, then
Take 31 of these, then
Take 30 of these, then
Take 33 of these, then
Take 35 of these, then
Take 33 of these, then
Take 39 of these, then
Take 37 of these, then
Take 37 of these, then
Take 37 of these, then
Take 37 of these, then
Take 37 of these, then
Take 38 of these, then
Take 39 of these, then
Take 41 of these, then
Take 41 of these, then
Take 40 of these, then
Take 39 of these, then
Take 39 of these, then
Take 39 of these, then
Take 39 of these, then
Take 39 of these, then'''
bin(ord('C'))
'0b1000011'
bin(ord('b'))
'0b1100010'

key = 'Can birds even understand me?'
s = list('0'*len(key)*8)

b = ''.join(bin(ord(c))[2:].zfill(8)[::-1] for c in key)
print(b)
lg = lg.split('\n')
lst = [int(i.split()[1]) for i in lg]
cur = 0
for i in range(0, len(s)):
    if b[i] == '1':
        print(i,lst[i//8])
        s[i-lst[cur]]='1'
        cur+=1
print(s)
print(''.join([chr(int(''.join(s[i:i+8][::-1]),2)) for i in range(0, len(s)-8, 8)]))
    
# 0,1,6
# 1,5,6

