import pygame
import random

# Initialize Pygame
pygame.init()
fps = 60
WIDTH, HEIGHT = 1000, 600
J_WIDTH, J_HEIGHT = 200, 200
displacement = 12

# Setup display
timer = pygame.time.Clock()
screen = pygame.display.set_mode((WIDTH, HEIGHT))
pygame.display.set_caption('Traffic Simulation')

# Load background image
bg_img = pygame.image.load('bg2.png')
bg_img = pygame.transform.scale(bg_img, (WIDTH, HEIGHT))

# Load car images
cars = [pygame.transform.scale(pygame.image.load(f'car{i+1}.png'), (28, 15)) for i in range(4)]

# Initialize the move number for the ambulance
move_num = 0

class Car(pygame.sprite.Sprite):
    def __init__(self, spawn_direction, turn_dir, is_ambulance, junction):
        super().__init__()
        self.is_ambulance = is_ambulance
        self.carimg = pygame.transform.scale(pygame.image.load("ambulance.png"), (28, 15)) if self.is_ambulance else random.choice(cars)
        self.image = self.carimg

        self.s_dir = spawn_direction
        self.turn_dir = turn_dir
        self.notstopped = True
        self.turned = False
        self.j = junction
        self.speed = self.j.speed

        self.image_update()
        self.rect = self.image.get_rect(center=(self.cx, self.cy))

        self.centerrect = pygame.Rect(self.j.cx - displacement, self.j.cy - displacement, displacement * 2, displacement * 2)

        self.displace()

    def image_update(self):
        dis = 5
        if self.s_dir == 0:  # Moving downwards
            self.image = pygame.transform.rotate(self.carimg, -90)
            self.cx = self.j.cx
            self.cy = self.j.y + dis
            self.dy = self.speed
        elif self.s_dir == 1:  # Moving leftwards
            self.image = pygame.transform.rotate(self.carimg, 180)
            self.cx = self.j.x + J_WIDTH - dis
            self.cy = self.j.cy
            self.dx = -self.speed
        elif self.s_dir == 2:  # Moving upwards
            self.image = pygame.transform.rotate(self.carimg, 90)
            self.cx = self.j.cx
            self.cy = self.j.y + J_HEIGHT - dis
            self.dy = -self.speed
        elif self.s_dir == 3:  # Moving rightwards
            self.image = self.carimg
            self.cx = self.j.x + dis
            self.cy = self.j.cy
            self.dx = self.speed

    def update(self):
        move_flag = True

        if self.s_dir == 0:
            if self.notstopped and not self.j.signal0.state and self.rect.bottom == self.centerrect.top:
                move_flag = False
            proj_rect = self.image.get_rect(center=(self.rect.centerx, self.rect.centery + 20))
        elif self.s_dir == 1:
            if self.notstopped and not self.j.signal1.state and self.rect.left == self.centerrect.right:
                move_flag = False
            proj_rect = self.image.get_rect(center=(self.rect.centerx - 20, self.rect.centery))
        elif self.s_dir == 2:
            if self.notstopped and not self.j.signal2.state and self.rect.top == self.centerrect.bottom:
                move_flag = False
            proj_rect = self.image.get_rect(center=(self.rect.centerx, self.rect.centery - 20))
        elif self.s_dir == 3:
            if self.notstopped and not self.j.signal3.state and self.rect.right == self.centerrect.left:
                move_flag = False
            proj_rect = self.image.get_rect(center=(self.rect.centerx + 20, self.rect.centery))

        if move_flag:
            if self.s_dir in [0, 2]:  # Vertical movement
                self.rect.centery += self.dy
            elif self.s_dir in [1, 3]:  # Horizontal movement
                self.rect.centerx += self.dx

        self.turn()
        self.junction_update()
        self.ambulance_signal_update()

    def inner_image_update(self):
        self.notstopped = False
        self.s_dir = self.turn_dir
        self.image_update()
        self.rect = self.image.get_rect(center=(self.j.cx, self.j.cy))
        self.displace()

    def turn(self):
        if (self.s_dir in [0, 2] and self.rect.centery == self.j.cy) or (self.s_dir in [1, 3] and self.rect.centerx == self.j.cx):
            self.inner_image_update()

    def displace(self):
        if self.s_dir == 0:
            self.rect.centerx += displacement
        elif self.s_dir == 1:
            self.rect.centery += displacement
        elif self.s_dir == 2:
            self.rect.centerx -= displacement
        elif self.s_dir == 3:
            self.rect.centery -= displacement

    def junction_update(self):
        x, y = self.rect.centerx, self.rect.centery
        jxx = (x // J_WIDTH) * J_WIDTH
        jyy = (y // J_HEIGHT) * J_HEIGHT

        if (self.j.x != jxx or self.j.y != jyy) and (0 <= x < WIDTH and 0 <= y < HEIGHT):
            junc_name = f"{x // J_WIDTH} {y // J_HEIGHT}"
            self.j = junctions[junc_name]
            self.centerrect = pygame.Rect(self.j.cx - displacement, self.j.cy - displacement, displacement * 2, displacement * 2)
            self.speed = self.j.speed
            self.s_dir = self.turn_dir
            self.turn_dir = random.randint(0, 3)
            self.notstopped = True
            self.turned = False

            if self.is_ambulance:
                global move_num
                move_num += 1
                self.turn_dir = calculate_turn(moves[move_num + 1], moves[move_num])

    def ambulance_signal_update(self):
        if self.is_ambulance and self.notstopped:
            for signal in self.j.signals:
                signal.update_state(0)
            self.j.signals[self.s_dir].update_state(1)

class Signal(pygame.sprite.Sprite):
    def __init__(self, direction, junction):
        super().__init__()
        self.direction = direction
        self.state = 0
        self.color = (255, 0, 0)
        self.rad = 10
        self.j = junction
        self.x = self.j.cx
        self.y = self.j.cy
        self.set_position()

    def set_position(self):
        if self.direction == 0:  # Downwards
            self.x += self.rad * 3
            self.y -= self.rad * 3
        elif self.direction == 1:  # Leftwards
            self.x += self.rad * 3
            self.y += self.rad * 3
        elif self.direction == 2:  # Upwards
            self.x -= self.rad * 3
            self.y += self.rad * 3
        elif self.direction == 3:  # Rightwards
            self.x -= self.rad * 3
            self.y -= self.rad * 3

    def update(self):
        self.draw_circle()

    def update_state(self, state):
        self.state = state
        self.color = (0, 255, 0) if self.state == 1 else (255, 0, 0)

    def draw_circle(self):
        pygame.draw.circle(screen, self.color, (self.x, self.y), self.rad)

class Junction:
    def __init__(self, x, y):
        self.x = x
        self.y = y
        self.cx = x + (J_WIDTH / 2)
        self.cy = y + (J_HEIGHT / 2)
        self.in_cars = []
        self.signal0 = Signal(0, self)
        self.signal1 = Signal(1, self)
        self.signal2 = Signal(2, self)
        self.signal3 = Signal(3, self)
        self.signals = [self.signal0, self.signal1, self.signal2, self.signal3]
        self.ticks = 0
        self.round = random.randint(3, 10) * fps
        self.signal_no = 0
        self.speed = random.randint(1, 3)
        self.change = False

    def update(self):
        self.ticks += 1
        if self.ticks > self.round:
            self.ticks = 0
            self.round = random.randint(3, 10) * fps
            self.change = True
        if self.change:
            self.signals[self.signal_no].update_state(0)
            self.signal_no += 1
            if self.signal_no == 4:
                self.signal_no = 0
            self.change = False
        self.signals[self.signal_no].update_state(1)

# Define grid and initialize junctions
junctions = {}
for i in range(0, WIDTH // J_WIDTH):
    for j in range(0, HEIGHT // J_HEIGHT):
        junc_name = f"{i} {j}"
        junctions[junc_name] = Junction(i * J_WIDTH, j * J_HEIGHT)

car_group = pygame.sprite.Group()
signal_group = pygame.sprite.Group()

# Game loop
running = True
while running:
    screen.fill((255, 255, 255))
    screen.blit(bg_img, (0, 0))

    for event in pygame.event.get():
        if event.type == pygame.QUIT:
            running = False

    if random.randint(1, 50) == 25:
        rand_turn = random.randint(0, 3)
        rand_junc = junctions[random.choice(list(junctions.keys()))]
        car_group.add(Car(random.randint(0, 3), rand_turn, random.choice([True, False]), rand_junc))

    car_group.update()
    signal_group.update()

    for junc in junctions.values():
        junc.update()

    car_group.draw(screen)
    pygame.display.update()
    timer.tick(fps)

pygame.quit()
