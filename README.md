# DeepChart (Beta)
Visualize Neural network achitectures.
https://pisimo.github.io/DeepChart/

Paste your keras (soon tflearn too) code and generate a visual rappresenation of your neural model.

<h1>Example:</h1>
Neural network code(keras):

```python
 net = Sequential()
 net.add(Dense(12,kernel_initializer=w_init,input_dim=12,activation='linear'))
 net.add(Reshape((1,12)))
 net.add(GRU(40,kernel_initializer=w_init,activation=act,return_sequences=True))
 net.add(Dropout(0.4))
 net.add(GRU(70,kernel_initializer=w_init,activation=act,return_sequences=True))
 net.add(Dropout(0.3))
 net.add(GRU(70,kernel_initializer=w_init,activation=act,return_sequences=True))
 net.add(Dropout(0.4))
 net.add(GRU(40,kernel_initializer=w_init,activation=act,return_sequences=False))
 net.add(Dropout(0.4))
 net.add(Dense(1,kernel_initializer=w_init,activation='linear'))
```

Generated image:

<img width=500 height=800 src="https://cloud.githubusercontent.com/assets/17238972/25045757/1fb9e1c6-212e-11e7-80db-acb4665d4dbb.png">
