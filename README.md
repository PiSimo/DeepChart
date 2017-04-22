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

<img width=500 height=800 src="https://cloud.githubusercontent.com/assets/17238972/25303841/4945f448-275b-11e7-8ad9-e4c9601a7d3a.png">
