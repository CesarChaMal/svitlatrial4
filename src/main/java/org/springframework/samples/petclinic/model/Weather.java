package org.springframework.samples.petclinic.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;

import org.hibernate.validator.constraints.NotEmpty;
import org.springframework.core.style.ToStringCreator;

@Entity
@Table(name = "weather")
public class Weather extends BaseEntity {

    @Column(name = "city")
    @NotEmpty
    private String city;

    @Column(name = "temp")
    @NotEmpty
    private String temp;

    public String getTemp() {
		return temp;
	}

	public void setTemp(String temp) {
		this.temp = temp;
	}

	public String getCity() {
        return this.city;
    }

    public void setCity(String city) {
        this.city = city;
    }






    @Override
    public String toString() {
        return new ToStringCreator(this)

            .append("id", this.getId())
            .append("new", this.isNew())
            .append("city", this.city)
            .toString();
    }
}
