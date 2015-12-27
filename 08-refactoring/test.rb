require 'minitest/autorun'

require_relative 'movie'
require_relative 'rental'
require_relative 'customer'

describe Customer do

  before do
    @movie_1 = Movie.new("Iron Man 3", NewReleasePrice.new)
    @movie_2 = Movie.new("Avatar",     RegularPrice.new)
    @movie_3 = Movie.new("Brave",      ChildrensPrice.new)

    @customer = Customer.new("Michael")
  end

  describe "customer statement" do

    it "is printed correctly for a new release movie" do
      @customer.add_rental(Rental.new(@movie_1,  3))
      @customer.statement.must_equal <<-END.strip
Rental Record for Michael
\tIron Man 3\t9
Amount owed is 9
You earned 2 frequent renter points
    END
    end

    it "is printed correctly for a regular movie" do
      @customer.add_rental(Rental.new(@movie_2, 3))
      @customer.statement.must_equal <<-END.strip
Rental Record for Michael
\tAvatar\t3.5
Amount owed is 3.5
You earned 1 frequent renter points
    END
    end
     
    it "is printed correctly for a childrens movies" do
      @customer.add_rental(Rental.new(@movie_3, 4))
      @customer.statement.must_equal <<-END.strip
Rental Record for Michael
\tBrave\t3.0
Amount owed is 3.0
You earned 1 frequent renter points
    END
    end 

    it "is summed up correctly for 3 movies" do
      @customer.add_rental(Rental.new(@movie_1,  2))
      @customer.add_rental(Rental.new(@movie_2, 3))
      @customer.add_rental(Rental.new(@movie_3, 4))
      @customer.statement.must_match /Amount owed is 12.5/
      @customer.statement.must_match /You earned 4 frequent renter points/
    end 
     
  end

  describe "customer html_statement" do

    it "is printed correctly for a new release movie" do
      @customer.add_rental(Rental.new(@movie_1,  2))
      @customer.html_statement.must_equal <<-END.strip
<h1>Rentals for <em>Michael</em></h1><p>
\tIron Man 3: 6<br>
<p>You owe <em>6</em><p>
On this rental you earned <em>2</em> frequent renter points<p>
      END
    end

    it "is printed correctly for a regular movie" do
      @customer.add_rental(Rental.new(@movie_2, 3))
      @customer.html_statement.must_equal <<-END.strip
<h1>Rentals for <em>Michael</em></h1><p>
\tAvatar: 3.5<br>
<p>You owe <em>3.5</em><p>
On this rental you earned <em>1</em> frequent renter points<p>
      END
    end

    it "is printed correctly for a childrens movies" do
      @customer.add_rental(Rental.new(@movie_3, 4))
      @customer.html_statement.must_equal <<-END.strip
<h1>Rentals for <em>Michael</em></h1><p>
\tBrave: 3.0<br>
<p>You owe <em>3.0</em><p>
On this rental you earned <em>1</em> frequent renter points<p>
      END
    end

    it "is summed up correctly for 3 movies" do
      @customer.add_rental(Rental.new(@movie_1,  2))
      @customer.add_rental(Rental.new(@movie_2, 3))
      @customer.add_rental(Rental.new(@movie_3, 4))
      @customer.statement.must_match /Amount owed is 12.5/
      @customer.statement.must_match /You earned 4 frequent renter points/
    end

  end
end

